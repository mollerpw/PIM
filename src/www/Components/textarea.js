// Renders the writing field. Checks with if/else statements if it needs to render just textarea or also images/files.
// Uses the currentNoteName variable to check and also display what the current note contains.
function renderWritingField() {
    if (currentNoteName.content == null){
        document.querySelector("#writingfield").innerHTML = `<textarea id=textArea placeholder= "Write here..."></textarea>`
    }
    else if (currentNoteName.imageURL != null && currentNoteName.uploadFile != null) {
          document.querySelector("#writingfield").innerHTML = `
            <div id="imgFileDiv" class="imgFileDiv">
            <img id="img" src=${currentNoteName.imageURL}><a id="downloadATag" href="${currentNoteName.uploadFile}" download>
            <button id="download">${currentNoteName.uploadFile}</button></a><button class="deleteFolderButton" onclick="deleteFile()"><strong>-</strong></button>
            </div><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
        }
    else if (currentNoteName.uploadFile != null && currentNoteName.imageURL == null){
        document.querySelector("#writingfield").innerHTML = `
            <div id="imgFileDiv" class="imgFileDiv"><a id="downloadATag" href="${currentNoteName.uploadFile}" download><button id="download">${currentNoteName.uploadFile}</button>
            </a><button class="deleteFolderButton" onclick="deleteFile()"><strong>-</strong></button>
            </div><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }
    else if (currentNoteName.uploadFile == null && currentNoteName.imageURL != null) {
        document.querySelector("#writingfield").innerHTML = `
            <div id="imgFileDiv" class="imgFileDiv"><img id="img" src=${currentNoteName.imageURL}></div>
            <textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }
    else {
        document.querySelector("#writingfield").innerHTML = `
            <div id="imgFileDiv" class="imgFileDiv"></div><textarea id=textArea placeholder= "Write here...">${currentNoteName.content}</textarea>`
    }
}