

function renderWritingField() {
    console.log("current folder: "+currentFolderName.name)
    console.log("current note: "+currentNoteName.name)
    console.log("current content: "+currentNoteName.content)

    if (currentNoteName.content == null){
        document.querySelector("#writingfield").innerHTML = `<textarea id=textArea placeholder= "Write here..."></textarea>`
    } else {
        document.querySelector("#writingfield").innerHTML = `<textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }
}