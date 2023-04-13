function createMarker(listing) {
  const latlng = fromLocationToLatLng(listing.location, 1, 6);
  const marker = L.marker(latlng);
  marker.bindPopup(listing.title);
  return marker;
}

function createCard(listing) {
  const card = document.createElement('div');
  card.className = 'card mb-4';

  const img = document.createElement('img');
  img.src = listing.locationImage;
  img.className = 'card-img-top';
  card.appendChild(img);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = listing.title;
  cardBody.appendChild(title);

  const description = document.createElement('p');
  description.className = 'card-text';
  description.textContent = listing.description;
  cardBody.appendChild(description);

  const price = document.createElement('p');
  price.className = 'card-footer';
  price.textContent = listing.price;
  card.appendChild(price);

  card.appendChild(cardBody);

  return card;
}

function updateListings() {
  const visibleListings = [];

  // Get current visible bounds of the map
  const bounds = map.getBounds();

  // Loop through all listings
  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];

    // Check if the listing marker is within the current bounds of the map
    if (bounds.contains(listing.marker.getLatLng())) {
      visibleListings.push(listing);
    }
  }

  // Update the sidebar content with the list of visible listings
  let sidebarContent = '';
  if (visibleListings.length === 0) {
    sidebarContent = '<h3 style="text-align: center; margin-top: 100%;">No listings found within the current map bounds.</h3>';
  } else {
    sidebarContent += '<div class="row">';
    for (let i = 0; i < visibleListings.length; i++) {
      const listing = visibleListings[i];
      const card = createCard(listing);
      sidebarContent += '<div class="col-md-12">' + card.outerHTML + '</div>';
    }
    sidebarContent += '</div>';
  }
  sidebar.setContent(sidebarContent);
}

var listings = [
  {
    id: 1,
    title: "Listing 1",
    description: "This is the first listing.",
    price: 100,
    location: { x: 2700, y: 64, z: 4153 },
    marker: null,
    markerImage: null,
    locationImage: "https://pbs.twimg.com/media/E2zf1ZTWYAcJC4x?format=jpg&name=large"
  },
  {
    id: 2,
    title: "Listing 2",
    description: "This is the second listing.",
    price: 200,
    location: { x: 2750, y: 64, z: 4153 },
    marker: null,
    markerImage: null,
    locationImage: "https://i.ytimg.com/vi/QNgYQanbReE/maxresdefault.jpg"
  },
  {
    id: 3,
    title: "Listing 3",
    description: "This is the third listing.",
    price: 300,
    location: { x: 2800, y: 64, z: 4153 },
    marker: null,
    markerImage: null,
    locationImage: "https://topg.org/gallery/350820/35678.png"
  }
];

// Create markercluster group
const markersCluster = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true
});

// Create all the markers on map load
for (let i = 0; i < listings.length; i++) {
  // Create marker
  const listing = listings[i];
  const marker = createMarker(listing);

  // Add marker to cluster group
  listing.marker = marker;
  markersCluster.addLayer(marker);
  map.addLayer(markersCluster);
}

// Update the listings on map move
map.on('move', updateListings);

// Initial update of listings
updateListings();