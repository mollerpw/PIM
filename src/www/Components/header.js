function renderHeader() {
    return `
        <h1>PIM</h1>
        <nav>
            <input id="file" type="file" accept="txt" placeholder="insert file" onclick="insertFile()">
            <input type="file" accept="image/*" placeholder="insert picture" onclick="insertPicture()">
            <button onclick="deleteNote()">Delete note</button>
            <button onclick="saveNote()">Save note</button>
        </nav>
    `
}

async function saveNote(){
    let savedNote = {
        name: currentNoteName.name,
        folder: currentFolderName.name,
        content: document.getElementById("textArea").value
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
        name: currentNoteName.name

    }

    let result = await fetch("/notes", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deletedNote)
    });
    //let response = await result.json();
    currentNoteName = {
        name: "",
        content: ""
    }
    renderNotes(currentFolderName.name);
    renderWritingField();
}

async function insertPicture() {
    let files = document.querySelector('input[type=file]').files;
    let formData = new FormData();

    for(let file of files) {
        formData.append('files', file, file.name);
    }

    let uploadResult = await fetch("/notes/pictures", {
        method: 'POST',
        body: formData
    });
    let imageUrl = await uploadResult.text();
}

async function insertFile() {
    let files = document.querySelector('#file').files;
    let formData = new FormData();

    for(let file of files) {
        formData.append('files', file, file.name);
    }

    let uploadResult = await fetch("/notes/files", {
        method: 'POST',
        body: formData
    });
    let imageUrl = await uploadResult.text();
}