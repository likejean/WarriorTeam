function DisplayCoordinates(ev) {
    if (ev === undefined) return;
    var x = ev.clientX;
    var y = ev.clientY;
    var coordinates = "Pointer Coordinates: (" + x + "," + y + ")";
    document.getElementById("coordinates").innerHTML = coordinates;
}

function ClearCoordinates() {
    document.getElementById("coordinates").innerHTML = "";
}
