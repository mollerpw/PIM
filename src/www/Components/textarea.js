function renderWritingField() {
    
    if (currentNoteName.content == null){
        document.querySelector("#writingfield").innerHTML = `<textarea id=textArea placeholder= "Write here..."></textarea>`
    } else {
        document.querySelector("#writingfield").innerHTML = `<textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }
}