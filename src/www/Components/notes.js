
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
    await fetch('/notes', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteNameToAdd)
    });

    location.reload();
    renderNotes(currentFolderName.name)

}

let currentNoteName = {
    name: "",
    content: ""
}

async function currentNote(index) {
    saveNote();
    currentNoteName = {
        name: document.getElementById("noteButton" + index).innerText.substr(0, document.getElementById("noteButton" + index).innerText.length),
        content: ""
    }
    let tempContent = await updateCurrentContent();
    currentNoteName = {
        name: document.getElementById("noteButton" + index).innerText.substr(0, document.getElementById("noteButton" + index).innerText.length),
        content: tempContent
    }

    //renderNotes(currentFolderName.name)
    renderWritingField();
    
    

}

async function updateCurrentContent() {
    let JSONNoteNames = await (await fetch('/notes')).json();



    let outputContent = "";
    let index = 0;
    for(let noteName of JSONNoteNames){
            if (noteName.name == currentNoteName.name) {
                return noteName.content;
                }
                }
                
        }

    
