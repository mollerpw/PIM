let folderPrompt = false;
let folderButton = [];
let currentFolderName = {
    name: ""
};
async function renderFolder() {
    let JSONfoldernames = await (await fetch('/folders')).json(); // fetches every folder from database
    let output = "";
    let index = 0;
    // go's through every folder and adds it with a delete button for the folder to the output variable as a string in html format
    for(let foldername of JSONfoldernames){
        folderButton[index] = "folderButton" + index; // adds the folderbutton in an array so we can identify it when we want to change color of it when you click it
        output += `
        <p id="folderElement${index}" class="folderCSS">
            <button id="folderButton${index}" class="folderButton" onClick="currentFolder(${index})">${foldername.name}</button>
            <button class="deleteFolderButton" onclick="deleteFolder(${index})">
                <strong>-</strong>
            </button>
        </p>`;
        index++;

    }
    document.querySelector("#folder").insertAdjacentHTML("beforeend",output);
}

function addFolderPrompt(){
    if(!folderPrompt){
        document.querySelector('#folder').insertAdjacentHTML("beforeend", `
        <input type="text" id="folderInput" name="fname"></input>
        <button id="folderButton" onClick="addFolder()">Add Folder</button>`);
        folderPrompt = true;
    }
}

async function addFolder(){

    let folderName = {      //saves the name of the folder
        name: document.getElementById("folderInput").value
    };

    saveNote();

    let rawResponse = await fetch('/folders', {     // attempts to add the folder to the database
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(folderName)
    });

    let response = await rawResponse.json();

    if (response == false) {        // checks if the folder alreadt exist in the database
        alert("Folder with that name already exists")
    }
    location.reload();  // reloads the webbpage whitch automaticaly removes the prompt and renders in the new folder
}

async function deleteFolder(index){

    folderName = {  //saves the name of the folder by taking all readable text from the html and removes the two last charakters in the string whitch is always: - and \n
        name: document.getElementById("folderElement" + index).innerText.substr(0, document.getElementById("folderElement" + index).innerText.length - 2)
    }

    await fetch("/folders", {       // deletes every note in the folder and the actual folder from the database
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(folderName)
    });

    location.reload(); //reloads the webbpage and by doing so removes the folder from the webbpage graficaly
}

function currentFolder(index) {
    saveNote();

    document.querySelector("header").innerHTML = "<h1>PIM</h1>"; // removes the header buttons for the writing field
    document.querySelector("#writingfield").innerHTML = "<h3> Create a new note or select a note to start. </h3>";

    currentFolderName = {   //saves the name of the folder by taking all readable text from the html and removes the two last charakters in the string whitch is always: - and \n
        name: document.getElementById("folderElement" + index).innerText.substr(0, document.getElementById("folderElement" + index).innerText.length - 2)
    }
    
    for(let i=0; i<folderButton.length; i++){ //(line 82-85) makes the folder you clicked on blue
        document.getElementById(folderButton[i]).style.backgroundColor = "#bdc2bd";
    }
    document.getElementById("folderButton" + index).style.backgroundColor = "rgb(39, 39, 151)";

    renderNotes(currentFolderName.name);
}