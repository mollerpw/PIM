let notePrompt = false;

function renderNotes() {
    return `

        <p>Biology</p>
        <p>Chemistry</p>
        <p>Business Management</p>
    `;
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