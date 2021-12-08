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
    await fetch('/folders', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(folderName)
    });
    location.reload();
}