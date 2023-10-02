const worldtomap = [2.0, 0.0, -1.2246467991473532E-16, -1.2246467991473532E-16, 0.0, -2.0, 0.0, 1.0, 0.0];
const maptoworld = [0.5, -3.061616997868383E-17, 0.0, 0.0, 0.0, 1.0, -3.061616997868383E-17, -0.5, 0.0];

function fromLocationToLatLng(location, tilescale, mapzoomout) {
    var lat = worldtomap[3] * location.x + worldtomap[4] * location.y + worldtomap[5] * location.z + 256, // Adjust for image offset
        lng = worldtomap[0] * location.x + worldtomap[1] * location.y + worldtomap[2] * location.z;

    return new L.LatLng(
        -(((128 << tilescale) - lat) / (1 << mapzoomout))
        , lng / (1 << mapzoomout)
        , location.y
    );
}

function fromLatLngToLocation(latlng, y, tilescale, mapzoomout) {
    var lat = (128 << tilescale) + latlng.lat * (1 << mapzoomout),
        lng = latlng.lng * (1 << mapzoomout),
        x = maptoworld[0] * lng + maptoworld[1] * lat + maptoworld[2] * y,
        z = maptoworld[6] * lng + maptoworld[7] * lat + maptoworld[8] * y + 128; // Adjust for image offset

    return { x: x, y: y, z: z };
}

// Display map and set view/fly to spawn point
const spawn = fromLocationToLatLng({ x: 2725, y: 64, z: 4153 }, 1, 6);
var map = L.map('map', {
    crs: L.CRS.Simple,
    zoom: 6,
    attributionControl: false,
}).setView([spawn.lat, spawn.lng]);

const bounds = fromLocationToLatLng({ x: 6000, y: 64, z: 6000 }, 1, 6);
var redmontMap = L.tileLayer('https://tiles.milklegend.xyz/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 8,
    maxNativeZoom: 7,
    bounds: [[0, 0], [bounds.lat, bounds.lng]],
    noWrap: true,
    unloadInvisibleTiles: true,
    reuseTiles: true
}).addTo(map);