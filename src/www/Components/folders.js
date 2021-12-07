let folderPrompt = false;

function renderFolder() {
    return `
    
        <p>School</p>
        <p>Work</p>
        <p>Art Projects</p>
    `;
}

function addFolderPrompt(){
    if(!folderPrompt){
        document.querySelector('#folder').insertAdjacentHTML("beforeend", `
        <input type="text" id="folderInput" name="fname"></input>
        <button id="folderButton" onClick="addFolder()">Add Folder</button>`);
        folderPrompt = true;
    }
}

function addFolder(){
    let folderName = document.getElementById("folderInput").value;

    //add to database
    location.reload();
}