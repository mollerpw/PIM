let folderPrompt = false;

async function renderFolder() {
    let JSONfoldernames = await (await fetch('/folders')).json();
    let output = "";
    for(let foldername of JSONfoldernames){
        output += `<p id="folderElement">${foldername.name}<button class="deleteFolderButton" onclick="deleteFolder()"><strong>-</strong></button></p>`;
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
    saveNote()
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

async function deleteFolder(){

    let folderName = {
        name: document.getElementById("folderInput").value
    };
    console.log(folderName.name);
    saveNote()
    await fetch('/folders', {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(folderName)
    });
    location.reload();
}