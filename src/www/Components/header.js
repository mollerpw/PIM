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
        content: "hejsan"
    }
    let result = await fetch(`/notes/`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(savedNote)
    });
    //let response = await result.json();
}