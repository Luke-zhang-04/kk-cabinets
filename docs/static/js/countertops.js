let data = new Map
let columnNum = 0
let columns = $("#row").find(".responsive_column")
let imgURL
let storageRef = storage.ref("countertops")

//if array conains target
function contains(target, array) {
    for (i of array) {
        if (target == i) {
            return true
        }
    }
    return false
}

//remove element from array
function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value
    })
}

//get countertops from firestore
db.collection("countertops").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        data[doc.id] = doc.data()
    })
    display_batch(data)
})

//handle data and display images accordingly
function display_batch(data) {
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

            //append information to element
            element.append(
                "<div class=\"details\"><p>" + data[id]["caption"] + "<p></div>"
            )
        })
        columnNum++
    }
    //remove loading gif
    $("#loading").css("display", "none")
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