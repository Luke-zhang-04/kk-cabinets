let data = new Map
let docNum = 0
let columnNum = 0
let columns = $("#row").find(".responsive_column")
let imgURL
let storageRef = storage.ref("gallery")

db.collection("gallery").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        data[doc.id] = doc.data()
    })
    display_batch()
})

function display_batch() {
    for (key in data) {
        imgURL = storageRef.child(data[key]["file"])
        let column = columns[columnNum]
        let id = key
        imgURL.getDownloadURL().then(function(url) {
            $(column).append(
                "<img onclick=\"expand(" + id + ")\"src=\""+ url + "\"/>"
            )
        })
        columnNum++
        if (columnNum == 4) {
            columnNum = 0
        }
    }
    $("#loading").remove()
}

function expand(key) {
    
}