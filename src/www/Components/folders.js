let folderPrompt = false;

function renderFolder() {
    let foldernames = await fetch('/folder');
    let output;
    for(let foldername in foldernames){
        output += `<p>${foldername.name}</p> <button class="deleteFolderButton" onclick="deleteFolder()"><strong>-</strong></button>`;
    }
    return output;
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
    let folderName = document.getElementById("folderInput").value;

    saveNote();

    await fetch(`/folders/`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(folderName)
    });

    location.reload();
}