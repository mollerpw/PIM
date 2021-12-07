function renderHeader() {
    return `
        <h1>PIM</h1>
        <nav>
            <button onclick="insertFile()">Insert File</button>
            <button onclick="insertPicture()">Insert Picture</button>
            <button onclick="deleteNote()">Delete note</button>
            <button onclick="saveNote()">Save note</button>
        </nav>
    `
}

async function saveNote(){
    let savedNote = {
        name: "annat",
        content: "hejhej"
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

async function deleteFolder(){
    let deletedFolder = {
        name: "annat",
        content: "hejhej",
        folder: "skola"
    }

    let result = await fetch("/folders", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deletedFolder)
    });
    //let response = await result.json();
}