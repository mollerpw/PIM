function renderHeader() {
    return `
        <h1>PIM</h1>
        <nav>
            <label for="file">Select a file:</label>
            <input id="file" type="file" accept="file_extension" placeholder="insert file">
            <button type="submit" onclick="insertFile(event)">save file</button>
            <label for="picture">Select an image:</label>
            <input id="picture" type="file" accept="image/*" placeholder="insert picture">
            <button type ="submit" onclick="insertPicture(event)">save picture</button>
            <button onclick="deleteNote()">Delete note</button>
            <button onclick="saveNote()">Save note</button>
        </nav>
    `
}

async function saveNote(){
    let savedNote = {
        id: currentNoteName.id,
        name: currentNoteName.name,
        folder: currentFolderName.name,
        content: document.getElementById("textArea").value,
        imageURL: currentNoteName.imageURL
    }

    let result = await fetch("/notes", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(savedNote)
    });
    //let response = await result.json();
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
    renderWritingField();
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
    console.log(imageURL);

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
            imageURL: imageURL
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

    await fetch("/notes", {
        method: "PUT",
        body: JSON.stringify(notes)
    })
}