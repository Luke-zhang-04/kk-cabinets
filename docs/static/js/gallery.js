let data = new Map
let columnNum = 0
let columns = $("#row").find(".responsive_column")
let imgURL
let storageRef = storage.ref("gallery")

//get filter options
let filterOptions = {
    colours: [],
    materials: [],
    furniture: ["cabinets", "countertop"],
    pattern: null,
    locations: []
}

//active filters
let activeFilters = {
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

//remove element from array
function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value
    })
}

//get projects from firestore
db.collection("gallery").get().then((snapshot) => {
    const infoTypes = ["colour", "material", "location"]
    snapshot.docs.forEach(doc => {
        data[doc.id] = doc.data()

        //get all possible filter options
        let details = doc.data().details
        for (infoType of infoTypes) {
            //if filter category not included yet, push it
            if (!(contains(details[infoType], filterOptions[infoType+"s"]))) {
                filterOptions[infoType+"s"].push(details[infoType])
            }
        }
    })

    //create buttons for filtering
    for ([count, infoType] of infoTypes.entries()) { //iterate through each filter type
        for (info of filterOptions[infoType+"s"]) { //within these types, get all filter options
            let id = info + "_" + infoType //unique id for each button
            $("#filter" + count).append( //create button for seleting filter
                "<button class=\"dropdown_menu\" id=" + id + ">" + info + "<span style=\"float: right;\" class=\"material-icons\">done</span></button>"
            )
            let filter_name = info
            let filter_type = infoType
            $("#"+id).click(function() { //create event listener for
                if (!contains(filter_name, activeFilters[filter_type+"s"])) {
                    activeFilters[filter_type+"s"].push(filter_name)
                    $(this).find("span").text("clear")
                } else {
                    activeFilters[filter_type+"s"] = arrayRemove(activeFilters[filter_type+"s"], filter_name)
                    $(this).find("span").text("done")
                }
            })
        }
    }
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

            //variable for information
            let info = "<br/>Colour: " + data[id]["details"]["colour"].charAt(0).toUpperCase() + data[id]["details"]["colour"].slice(1) + "<br/>Furniture: "

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

//expand filter dropdown
function expand_filter(numb) {
    let element = document.getElementById("filter"+numb)
    if (element.style.maxHeight){
        element.style.maxHeight = null;
    } else {
        element.style.maxHeight = element.scrollHeight + "px";
    }
}

//apply the filters
function apply_filters() {
    const filterTypes = ["colour", "material", "location"] //filter rtpes
    $(".image_container").remove() //get rid of all images in gallery
    $("#loading").css("display", "block") //display loading gif
    let filteredData = new Map //new map of filtered data
    console.log(data, "DATA")
    for (key in data) { //iterate through data
        doc = data[key]
        let broken = false
        for (filter of filterTypes) { //make sure doc doesn't have attribute assosiated with a selected filter
            if (contains(doc["details"][filter], activeFilters[filter+"s"])) {
                broken = true
                break
            }
        }
        if (activeFilters["pattern"] !== null && doc["details"]["pattern"] !== activeFilters["pattern"]) {
            broken = true;
        }

        if (activeFilters["countertop"] !== null && activeFilters["cabinets"] !== null) {
            let match = (
                doc["details"]["furniture"]["countertop"] !== activeFilters["countertop"] ||
                doc["details"]["furniture"]["cabinet"] !== activeFilters["cabinets"]
            )
            if (match) {
                broken = true;
            }
        }

        if (!broken) { //if data isn't filtered, add it to filtered data
            filteredData[key] = doc
        }
    }
    display_batch(filteredData) //display filtered data
}

function clear_filters() {
    $(".image_container").remove() //get rid of all images in gallery
    $(".dropdown_menu").each(function() { //change all x to checkmarks
        if ($(this).find("span").text() == "clear") {
            $(this).find("span").text("done")
        }
    })
    $("#pattern_toggle").find("span").text("remove")
    //reset active filters
    activeFilters = {
        colours: [],
        materials: [],
        cabinets: null,
        countertop: null,
        pattern: null,
        locations: []
    }
    $("#loading").css("display", "block") //display loading gif
    display_batch(data)
}

$("document").ready(function() {
    $("#pattern_toggle").click(function() {
        if ($(this).find("span").text() === "remove") {
            $(this).find("span").text("clear")
            activeFilters["pattern"] = false

        } else if ($(this).find("span").text() === "clear") {
            $(this).find("span").text("done")
            activeFilters["pattern"] = true

        } else if ($(this).find("span").text() === "done") {
            $(this).find("span").text("remove")
            activeFilters["pattern"] = null
        }
    })

    const furniture_dropdowns = ["either", "both", "countertop", "cabinets"]
    $(".furniture_dropdown").each(function() {
        $(this).click(function() {
            for (i of furniture_dropdowns) {
                $("#" + i + "_furniture").find("span").text("")
            }
            $(this).find("span").text("done")
            let id = $(this).attr('id')
            id = id.replace("_furniture", "")
            console.log(id)

            if (id === "both") {
                activeFilters["cabinets"] = true
                activeFilters["countertop"] = true

            } else if (id === "either") {
                activeFilters["cabinets"] = null
                activeFilters["countertop"] = null
                
            } else if (id === "countertop") {
                activeFilters["cabinets"] = false
                activeFilters["countertop"] = true

            } else if (id === "cabinets") {
                activeFilters["cabinets"] = true
                activeFilters["countertop"] = false
            }
            console.log("activeFilters", activeFilters)
        })
    })
})