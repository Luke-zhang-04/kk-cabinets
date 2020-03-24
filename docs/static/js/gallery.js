let data = new Map
let docNum = 0
let columnNum = 0
let columns = $("#row").find(".responsive_column")
let imgURL
let storageRef = storage.ref("gallery")

//get filter options
let filterOptions = {
    colours: [],
    materials: [],
    cabinets: null,
    countertop: null,
    pattern: null,
    locations: []
}

//if array conains target
function contains(target, array) {
    for (i of array) {
        if (target == i) {
            return true
        }
    }
    return false
}

//get projects from firestore
db.collection("gallery").get().then((snapshot) => {
    const infoTypes = ["colour", "material", "location"]
    snapshot.docs.forEach(doc => {
        data[doc.id] = doc.data()

        //get all possible filter options
        let details = doc.data().details
        for (infoType of infoTypes) {
            if (!(contains(details[infoType], filterOptions[infoType+"s"]))) {
                filterOptions[infoType+"s"].push(details[infoType])
            }
        }
    })
    for ([count, infoType] of infoTypes.entries()) {
        for (info of filterOptions[infoType+"s"]) {
            $("#filter" + count).append(
                "<button>" + info + "</button>"
            )
        }
    }
    display_batch()
})

//handle data and display images accordingly
function display_batch() {
    for (key in data) {
        imgURL = storageRef.child(data[key]["file"]) //image url
        let column = columns[columnNum%4] //column to append image to
        let id = key //for asynchronus getDownloadURL
        imgURL.getDownloadURL().then(function(url) {
            //append image to column
            $(column).append( 
                "<div class=\"image_container\" id=" + id + "><img onclick=\"expand(" + id + ")\"src=\""+ url + "\"/></div>"
            )

            //attach information to image
            let element = $("#" + id) //shortcut for target element

            //variable for information
            let info = "Colour: " + data[id]["details"]["colour"].charAt(0).toUpperCase() + data[id]["details"]["colour"].slice(1) + "<br/>Furniture: "

            //furniture type
            if (data[id]["details"]["furniture"]["countertop"] && data[id]["details"]["furniture"]["cabinet"]) {
                info += "Countertop and Cabinets "
            } else if (data[id]["details"]["furniture"]["cabinet"]) {
                info += "Cabinets"
            } else if (data[id]["details"]["furniture"]["countertop"]) {
                info += "Countertop"
            }

            //location
            info += "<br/>Location: " + data[id]["details"]["location"].charAt(0).toUpperCase() + data[id]["details"]["location"].slice(1)
            //material
            info += "<br/>Material: " + data[id]["details"]["material"].charAt(0).toUpperCase() + data[id]["details"]["material"].slice(1)
            //pattern
            info += "<br/>Pattern: " + (data[id]["details"]["pattern"] ? "Yes" : "None")

            //append information to element
            element.append(
                "<div class=\"details\"><p>" + info + "<p></div>"
            )
        })
        columnNum++
    }
    //remove loading gif
    $("#loading").remove()
}

//makes information drop down
function expand(key) {
    let element = document.getElementById(key)
    let container = element.getElementsByClassName("details")[0]
    if (container.style.maxHeight){
        container.style.maxHeight = null;
    } else {
        container.style.maxHeight = container.scrollHeight + "px";
    }
}

function expand_filter(numb) {
    let element = document.getElementById("filter"+numb)
    if (element.style.maxHeight){
        element.style.maxHeight = null;
    } else {
        element.style.maxHeight = element.scrollHeight + "px";
    }
}