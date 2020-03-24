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
                "<div class=\"image_container\" id=" + id + "><img onclick=\"expand(" + id + ")\"src=\""+ url + "\"/></div>"
            )
            let element = $("#" + id)
            let info = "Colour: " + data[id]["details"]["colour"].charAt(0).toUpperCase() + data[id]["details"]["colour"].slice(1) + "<br/>Furniture: "

            if (data[id]["details"]["furniture"]["countertop"] && data[id]["details"]["furniture"]["cabinet"]) {
                info += "Countertop and Cabinets "
            } else if (data[id]["details"]["furniture"]["cabinet"]) {
                info += "Cabinets"
            } else if (data[id]["details"]["furniture"]["countertop"]) {
                info += "Countertop"
            }

            info += "<br/>Location: " + data[id]["details"]["location"].charAt(0).toUpperCase() + data[id]["details"]["location"].slice(1)
            info += "<br/>Material: " + data[id]["details"]["material"].charAt(0).toUpperCase() + data[id]["details"]["material"].slice(1)
            info += "<br/>Pattern: " + (data[id]["details"]["pattern"] ? "Yes" : "None")

            element.append(
                "<div class=\"details\"><p>" + info + "<p></div>"
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
    let element = document.getElementById(key)
    let container = element.getElementsByClassName("details")[0]
    if (container.style.maxHeight){
        container.style.maxHeight = null;
      } else {
        container.style.maxHeight = container.scrollHeight + "px";
      }
}