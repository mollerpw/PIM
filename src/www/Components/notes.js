let notePrompt = false;

async function renderNotes() {
    let JSONNoteNames = await (await fetch('/notes')).json();
    let outputNote = "";
    for(let noteName of JSONNoteNames){
        outputNote += `<p id="noteElement">${noteName.name}</p>`;
    }

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

async function addNote(){
    let noteNameToAdd = {
        name: document.getElementById("noteInput").value,
        folder: "jobb"
    };
    console.log(noteNameToAdd);
    //saveNote()
    let rawResponse = await fetch('/notes', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteNameToAdd)
    });

    location.reload();

}