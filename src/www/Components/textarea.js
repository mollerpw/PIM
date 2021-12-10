function renderWritingField() {
    if (currentNoteName.content == null){
        document.querySelector("#writingfield").innerHTML = `<textarea id=textArea placeholder= "Write here..."></textarea>`
    } else if (currentNoteName.uploadFile == null || currentNoteName.uploadFile == ""){
        document.querySelector("#writingfield").innerHTML = `<img id="img" src=${currentNoteName.imageURL}></img><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }else {
        document.querySelector("#writingfield").innerHTML = `<img id="img" src=${currentNoteName.imageURL}></img><a href="${currentNoteName.uploadFile}" download>Download ${currentNoteName.uploadFile}</a><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }
}