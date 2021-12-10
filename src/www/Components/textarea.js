

function renderWritingField() {
    console.log("current folder: "+currentFolderName.name)
    console.log("current note: "+currentNoteName.name)
    console.log("current content: "+currentNoteName.content)
    console.log("current note id: "+currentNoteName.id)
    console.log("current img: "+currentNoteName.imageURL)
    console.log("current uploadFile: "+currentNoteName.uploadFile)

    if (currentNoteName.content == null){
        document.querySelector("#writingfield").innerHTML = `<textarea id=textArea placeholder= "Write here..."></textarea>`
    } else if (currentNoteName.uploadFile == null || currentNoteName.uploadFile == ""){
        document.querySelector("#writingfield").innerHTML = `<img id="img" src=${currentNoteName.imageURL}></img><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }else {
        document.querySelector("#writingfield").innerHTML = `<img id="img" src=${currentNoteName.imageURL}></img><a href="${currentNoteName.uploadFile}" download>Download ${currentNoteName.uploadFile}</a><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }
}