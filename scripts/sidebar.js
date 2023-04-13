var sidebar = L.control.sidebar("sidebar", {
    position: "left",
    closeButton: false,
    autoPan: true
})

map.addControl(sidebar);

setTimeout(function() {
    sidebar.show();
}, 500);