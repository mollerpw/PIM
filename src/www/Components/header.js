function renderHeader() {
    document.querySelector("header").innerHTML = "";
    document.querySelector("header").innerHTML = `
    <nav>
        <h1>PIM</h1>
        <label for="file">Select a file:</label>
        <input id="file" type="file" accept="file_extension" placeholder="insert file">
        <button class="headerButton" type="submit" onclick="insertFile(event)">save file</button>
        <label for="picture">Select an image:</label>
        <input id="picture" type="file" accept="image/*" placeholder="insert picture">

        <button type="submit" onclick="deletePicture(event)">delete picture</button>
        <button class="headerButton" type ="submit" onclick="insertPicture(event)">save picture</button>
        <button class="headerButton" onclick="deleteNote()">Delete note</button>
        <button class="headerButton" onclick="saveNote()">Save note</button>
    </nav>`
}

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
        //let response = await result.json();
    }
}

async function deleteNote(){
    let deletedNote = {
        id: currentNoteName.id

    }

    let result = await fetch("/notes", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deletedNote)
    });
    //let response = await result.json();
    currentNoteName = {
        id: "",
        name: "",
        content: ""
    }
    renderNotes(currentFolderName.name);
}

async function insertPicture(e) {
    e.preventDefault();
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
            content: currentNoteName.content,
            imageURL: imageURL,
            uploadFile: currentNoteName.uploadFile
        }

    await fetch("/notes", {
        method: "PUT",
        body: JSON.stringify(notes)
    })
    renderWritingField();
}

async function insertFile(e) {
    e.preventDefault();
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
    console.log(uploadFile);

    let notes = {
        id: currentNoteName.id,
        name: currentNoteName.name,
        content: currentNoteName.content,
        uploadFile: uploadFile
    }
    currentNoteName = {
        id: currentNoteName.id,
        name: currentNoteName.name,
        content: currentNoteName.content,
        imageURL: currentNoteName.imageURL,
        uploadFile: uploadFile
    }

    await fetch("/notes", {
        method: "PUT",
        body: JSON.stringify(notes)
    })
    renderWritingField();
}

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

    currentNoteName.imageURL = null;
    renderWritingField();
}