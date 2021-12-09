
let notePrompt = false;


async function renderNotes(folderName) {

    let JSONNoteNames = await (await fetch('/notes')).json();
    document.querySelector('#noteElement').innerHTML = ""
    let outputNote = "";
    let index = 0;
    for(let noteName of JSONNoteNames){
        if (noteName.folder == folderName) {
            outputNote += `
                <button class="noteButton" id="noteButton${index}" onClick="currentNote(${index})">${noteName.name}</button> <br>
            `;
        }
        index++;
    }
 
    document.querySelector('#noteElement').insertAdjacentHTML("beforeend",outputNote);
}


function addNotePrompt(){
    console.log("prmotp");
    if(!notePrompt){
        document.querySelector('#notes').insertAdjacentHTML("beforeend", `
        <input type="text" id="noteInput" name="fname"></input>
        <button id="noteButton" onClick="addNote()">Add Note</button>`);
        notePrompt = true;
    }
}

async function addNote(){
    console.log(currentFolderName.name)
    let noteNameToAdd = {
        name: document.getElementById("noteInput").value,
        folder: currentFolderName.name
    };
    console.log(noteNameToAdd);
    //saveNote()
    let rawResponse = await fetch('/notes', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteNameToAdd)
    });
    let response = await rawResponse.json();
    console.log(response)
    if (response === false) {
        alert("A note with this name already exist in current folder")
    }else {
        document.getElementById("noteInput").remove();
        document.getElementById("noteButton").remove();
        renderNotes(currentFolderName.name)
        notePrompt = false;
    }
}

let currentNoteName = {
    id: "",
    name: "",
    content: "",
    imageURL: ""
}

async function currentNote(index) {
    saveNote();
    currentNoteName = {
        name: document.getElementById("noteButton" + index).innerText,
        content: ""
    }

    let tempContent = await updateCurrentContent();

    currentNoteName = {
        id: tempContent.id,
        name: tempContent.name,
        content: tempContent.content,
        imageURL: tempContent.imageURL
    }
    //renderNotes(currentFolderName.name)
    renderWritingField();
}

async function updateCurrentContent() {
    let JSONNoteNames = await (await fetch('/notes')).json();

    for(let noteName of JSONNoteNames){
        if (noteName.name == currentNoteName.name && noteName.folder == currentFolderName.name) {

            return noteName;
        }
    }
}
