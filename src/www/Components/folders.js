let folderPrompt = false;
let folderButton = [];
let currentFolderName = {
    name: ""
};
async function renderFolder() {
    let JSONfoldernames = await (await fetch('/folders')).json();
    let output = "";
    let index = 0;
    for(let foldername of JSONfoldernames){
        folderButton[index] = "folderButton"+index
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

    let folderName = {
        name: document.getElementById("folderInput").value
    };

    saveNote();

    let rawResponse = await fetch('/folders', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(folderName)
    });

    let response = await rawResponse.json();

    if (response === false) {
        alert("Folder with that name already exists")
    }
    location.reload();
}

async function deleteFolder(index){

    folderName = {
        name: document.getElementById("folderElement" + index).innerText.substr(0, document.getElementById("folderElement" + index).innerText.length - 2)
    }

    await fetch("/folders", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(folderName)
    });

    location.reload();
}


function currentFolder(index) {
    saveNote();


    document.querySelector("header").innerHTML = "";
    document.querySelector("header").innerHTML = "<h1>PIM</h1>";
    document.querySelector("#writingfield").innerHTML = "<h3> Create a new note or select a note to start. </h3>";

    currentFolderName = {
        name: document.getElementById("folderElement" + index).innerText.substr(0, document.getElementById("folderElement" + index).innerText.length - 2)
    }
    
    for(let i=0; i<folderButton.length; i++){
        document.getElementById(folderButton[i]).style.backgroundColor = "#bdc2bd";
        
    }
    document.getElementById("folderButton" + index).style.backgroundColor = "rgb(39, 39, 151)";

    renderNotes(currentFolderName.name);
}