
let notePrompt = false;
//Global variable that updates when you navigate to render the correct response
let currentNoteName = {
    id: "",
    name: "",
    content: "",
    imageURL: "",
    uploadFile: ""
}

let noteButton = [];
async function renderNotes(folderName) {
    let outputNote = "";
    let HTMLpos = "";
    let HTMLorigin = "";
    
    let JSONNoteNames = await (await fetch('/notes')).json(); // fetches every note in the database

    //checks if the note div exists, if it doesn't: it adds the div after the folder div. 
    //if it does: it re adds the note title with the add note button and at the same time removes every note in the list
    if(document.querySelector("#notes") == null){   
        outputNote = `<div class="notes" id="notes">
        <h2>Notes <button class="addButton" onClick="addNotePrompt()">+</button> </h2>`;
        HTMLpos = "afterend";
        HTMLorigin = "#folder";
        document.getElementById("writingfield").style.flex = 4;
    }
    else{
        HTMLpos = "beforeend";
        HTMLorigin = "#notes";
        document.querySelector("#notes").innerHTML = '<h2>Notes <button class="addButton" onClick="addNotePrompt()">+</button> </h2>';
    }
    // go's through every note and adds the notes in the current folder the html element in the form of a string to the outputNote variable
    let index = 0;
    for(let noteName of JSONNoteNames){
        if (noteName.folder == folderName) {
            noteButton[index] = "noteButton" + index; // adds the notebutton in an array so we can identify it when we want to change color of it when you click it
            outputNote += `
                <button class="noteButton" id="noteButton${index}" onClick="currentNote(${index})">${noteName.name}</button> <br>
            `;
            index++;
        }
    }
    noteButton.length = index;
    document.querySelector(HTMLorigin).insertAdjacentHTML(HTMLpos,outputNote);
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

    let noteNameToAdd = {  // saves the name of the note 
        name: document.getElementById("noteInput").value,
        folder: currentFolderName.name
    };

    let rawResponse = await fetch('/notes', {   // attempts to add the note to the database
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteNameToAdd)
    });

    let response = await rawResponse.json();

    if (response == false) { // checks if the note exists in the database 
        alert("A note with this name already exist in current folder")
    }else {
        document.getElementById("noteInput").remove();  //(line 77 and 78) removes the pormpts
        document.getElementById("noteButton").remove();
        renderNotes(currentFolderName.name)
        notePrompt = false;
    }
}

async function currentNote(index) {
    saveNote();
    currentNoteName = {     // saves the note name you clicked
        name: document.getElementById("noteButton" + index).innerText,
        content: ""
    }

    let tempContent = await updateCurrentContent();

    currentNoteName = {
        id: tempContent.id,
        name: tempContent.name,
        content: tempContent.content,
        imageURL: tempContent.imageURL,
        uploadFile: tempContent.uploadFile
    }
    
    for(let i = 0;i < noteButton.length;i++){   // (line 101-104) makes the color of the note you clicked on blue
        document.getElementById(noteButton[i]).style.backgroundColor = "#bdc2bd";
    }
    document.getElementById("noteButton" + index).style.backgroundColor = "rgb(39, 39, 151)";

    renderWritingField();
    renderHeader();
}

// returns the note object of the note you clicked on by comparing every note's name in the database with the one saved on line 86
async function updateCurrentContent() { 
    let JSONNoteNames = await (await fetch('/notes')).json();

    for(let noteName of JSONNoteNames){
        if (noteName.name == currentNoteName.name && noteName.folder == currentFolderName.name) {

            return noteName;
        }
    }
}