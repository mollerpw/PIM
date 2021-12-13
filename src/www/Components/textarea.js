function renderWritingField() {
    console.log(currentNoteName.imageURL)
    console.log(currentNoteName.uploadFile)
    if (currentNoteName.content == null){
        document.querySelector("#writingfield").innerHTML = `<textarea id=textArea placeholder= "Write here..."></textarea>`
    }
    else if (currentNoteName.imageURL != null && currentNoteName.uploadFile != null) {
          document.querySelector("#writingfield").innerHTML = `<div id="imgFileDiv" class="imgFileDiv"><img id="img" src=${currentNoteName.imageURL}></img><a id="downloadATag" href="${currentNoteName.uploadFile}" download><button id="download">${currentNoteName.uploadFile}</button></a></div><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
        }
    else if (currentNoteName.uploadFile != null && currentNoteName.imageURL == null){
        document.querySelector("#writingfield").innerHTML = `<div id="imgFileDiv" class="imgFileDiv"><a id="downloadATag" href="${currentNoteName.uploadFile}" download><button id="download">${currentNoteName.uploadFile}</button></a></div><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }
    else if (currentNoteName.uploadFile == null && currentNoteName.imageURL != null) {
        document.querySelector("#writingfield").innerHTML = `<div id="imgFileDiv" class="imgFileDiv"><img id="img" src=${currentNoteName.imageURL}></img></div><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }
    else {
        document.querySelector("#writingfield").innerHTML = `<div id="imgFileDiv" class="imgFileDiv"></div><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }
}