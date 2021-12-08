//let currentNote = {
//    name: ""
//}

let currentNote = {
    name: "Skolprojekt",
    content: "TEst text 123, 3455. DETTA ÄR MASSA TEST"
};

function renderWritingField() {
    console.log(currentNote.name)
    if (currentNote.name == ""){
    return `
        <textarea id=textArea placeholder= "Write here..."></textarea>
    `
    }
    else {
        return `
            <textarea id=textArea placeholder= "Write here...">${currentNote.content}</textarea>
        `

    }
}