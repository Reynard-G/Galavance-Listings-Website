// Display coordinates on mouse move
map.on("mousemove", function (event) {
    const location = fromLatLngToLocation(event.latlng, 64, 1, 6);
    document.getElementById("coordinates").innerHTML = `X: ${Math.round(location.x)} Y: ${Math.round(location.y)} Z: ${Math.round(location.z)}`;
});

// Reset coordinates on mouse out
map.on("mouseout", function () {
    document.getElementById("coordinates").innerHTML = "X: ---- Y: -- Z: ----";
});