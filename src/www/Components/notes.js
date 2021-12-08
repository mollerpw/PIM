let notePrompt = false;

async function renderNotes() {
    let JSONNoteNames = await (await fetch('/notes')).json();
    let outputNote = "";
    for(let noteName of JSONNoteNames){
        outputNote += `<p id="noteElement">${noteName.name}</p>`;
    }
    console.log(outputNote)
    document.querySelector('#notes').insertAdjacentHTML("beforeend",outputNote);
}


function addNotePrompt(){
    if(!notePrompt){
        document.querySelector('#notes').insertAdjacentHTML("beforeend", `
        <input type="text" id="noteInput" name="fname"></input>
        <button id="noteButton" onClick="addNote()">Add Note</button>`);
        notePrompt = true;
    }
}

function addNote(){
    let folderName = document.getElementById("noteInput").value;

    //save note before reloading
    //add to database
    location.reload();
}