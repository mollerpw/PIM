//Renders the navigation menu
function renderHeader() {
    document.querySelector("header").innerHTML = `
    <h1>PIM</h1>
    <nav>
        <div>
        <button class="headerButton" onclick="document.getElementById('file').click()">Choose file</button>
        <input id="file" type="file" style="display:none" accept="file_extension" placeholder="insert file">
        <button class="headerButton" type="submit" onclick="insertFile(event)">Save file</button>
        </div>
        <div>
        <button class="headerButton" onclick="document.getElementById('picture').click()">Choose picture</button>
        <input id="picture" type="file" style="display:none" accept="image/*" placeholder="insert picture">
        <button class="headerButton" type ="submit" onclick="insertPicture(event)">Save picture</button>
        <button class="headerButton" type="submit" onclick="deletePicture(event)">Delete picture</button>
        </div>
        <div>
        <button class="headerButton" onclick="deleteNote()">Delete note</button>
        <button class="headerButton" onclick="saveNote()">Save note</button>
        </div>

    </nav>`
}
// Saves the current text in textArea if there is any,
// and sends an update request to an endpoint with the savedNote object
async function saveNote(){
    if(document.querySelector("#textArea") != null){
        let savedNote = {
            id: currentNoteName.id,
            name: currentNoteName.name,
            folder: currentFolderName.name,
            content: document.getElementById("textArea").value,
            imageURL: currentNoteName.imageURL,
            uploadFile: currentNoteName.uploadFile
        }
    
        let result = await fetch("/notes", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(savedNote)
        });
    }
}

async function deleteNote(){
    let deletedNote = {     // saves the id of the note you whant to delete
        id: currentNoteName.id
    }

    let result = await fetch("/notes", {    //deletes the note in the database
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deletedNote)
    });
    
    renderNotes(currentFolderName.name);    //(line 55-57) rerenders the notes, removes the header buttons
    document.querySelector("header").innerHTML = "<h1>PIM</h1>";
    document.querySelector("#writingfield").innerHTML = "<h3> Create a new note or select a note to start. </h3>";
}
// This function posts the picture information
// and sends an update request to an endpoint with the picture
async function insertPicture(e) {
    e.preventDefault();
    saveNote();
    let files = document.querySelector('#picture').files;
    let formData = new FormData();

    for(let file of files) {
        formData.append('files', file, file.name);
    }

    let uploadResult = await fetch("/notes/pictures", {
        method: 'POST',
        body: formData
    });
    let imageURL = await uploadResult.text();

    let notes = {
        id: currentNoteName.id,
        name: currentNoteName.name,
        content: currentNoteName.content,
        imageURL: imageURL
    }
        currentNoteName = {
            id: currentNoteName.id,
            name: currentNoteName.name,
            content: document.getElementById("textArea").value,
            imageURL: imageURL,
            uploadFile: currentNoteName.uploadFile
        }

    await fetch("/notes", {
        method: "PUT",
        body: JSON.stringify(notes)
    })
    renderWritingField();
}
// This function posts the file information
// and sends an update request to an endpoint with the file
async function insertFile(e) {
    e.preventDefault();
    saveNote();
    let files = document.querySelector('#file').files;
    let formData = new FormData();

    for(let file of files) {
        formData.append('files', file, file.name);
    }

    let uploadResult = await fetch("/notes/files", {
        method: 'POST',
        body: formData
    });
    let uploadFile = await uploadResult.text();

    let notes = {
        id: currentNoteName.id,
        name: currentNoteName.name,
        content: currentNoteName.content,
        uploadFile: uploadFile
    }
    currentNoteName = {
        id: currentNoteName.id,
        name: currentNoteName.name,
        content: document.getElementById("textArea").value,
        imageURL: currentNoteName.imageURL,
        uploadFile: uploadFile
    }

    await fetch("/notes", {
        method: "PUT",
        body: JSON.stringify(notes)
    })
    renderWritingField();
}
// Removes the picture and sends an update
// request to an endpoint without the picture
async function deletePicture() {
    let deletedPicture = {
        id: currentNoteName.id,
        imageURL: currentNoteName.imageURL
    }

    await fetch("/notes/pictures", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deletedPicture)
    });
    currentNoteName.content = document.getElementById("textArea").value;
    currentNoteName.imageURL = null;
    renderWritingField();
}
// Removes the file and sends an update
// request to an endpoint without the file
async function deleteFile() {
    let deletedFile = {
        id: currentNoteName.id,
        uploadFile: currentNoteName.uploadFile
    }

    await fetch("/notes/files", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deletedFile)
    });
    currentNoteName.content = document.getElementById("textArea").value;
    currentNoteName.uploadFile = null;
    renderWritingField();
}