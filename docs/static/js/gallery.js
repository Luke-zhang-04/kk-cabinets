let data = []
let docNum = 0
let columnNum = 0
let columns = $("#row").find(".responsive_column")
let imgURL
let storageRef = storage.ref("gallery")

db.collection("gallery").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        data.push(doc.data())
    })
    display_batch()
})

function display_batch() {
    for (project of data) {
        imgURL = storageRef.child(project["file"])
        let column = columns[columnNum]
        imgURL.getDownloadURL().then(function(url) {
            $(column).append(
                "<img src=\""+ url + "\"/>"
            )
        })
        columnNum++
        if (columnNum == 4) {
            columnNum = 0
        }
    }
}