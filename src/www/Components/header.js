function renderHeader() {
    return `
        <h1>PIM</h1>
        <nav>
            <input id="file" type="file" accept="txt" placeholder="insert file" onclick="insertFile()">
            <input id="picture" type="file" accept="image/*" placeholder="insert picture">
            <button type ="submit" onclick="insertPicture(event)">save picture</button>
            <button onclick="deleteNote()">Delete note</button>
            <button onclick="saveNote()">Save note</button>
        </nav>
    `
}

async function saveNote(){
    let savedNote = {
        name: "annat",
        folder: "jobb",
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
        name: "annat",
        content: "hejhej"
    }

    let result = await fetch("/notes", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deletedNote)
    });
    //let response = await result.json();
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
        name: "något",
        content: "ny image",
        imageURL: imageURL
    }

    await fetch("/notes", {
        method: "PUT",
        body: JSON.stringify(notes)
    })
}

async function insertFile() {
    let files = document.querySelector('#file').files;
    let formData = new FormData();

    for(let file of files) {
        formData.append('files', file, file.name);
    }

    let uploadResult = await fetch("/notes/pictures", {
        method: 'POST',
        body: formData
    });
    let imageUrl = await uploadResult.text();

    let notes = {
        name: "något",
        content: "ny image",
        imageUrl: imageUrl
    }

    await fetch("/notes", {
        method: "PUT",
        body: JSON.stringify(notes)
    })
}