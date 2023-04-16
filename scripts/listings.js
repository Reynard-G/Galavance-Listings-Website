function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

function createMarker(listing) {
  const latlng = fromLocationToLatLng(listing.location, 1, 6);
  const marker = L.marker(latlng);
  marker.bindPopup(listing.title);
  return marker;
}

function handleCardClick(listing) {
  console.log("Clicked on listing: " + listing.title);
  // Update the sidebar content with the information of the clicked listing
  let sidebarContent = '';
  sidebarContent += '<div class="row">';
  sidebarContent += '<div class="col-md-12">';
  sidebarContent += '<div class="card mb-4 border-light">';
  
  // Add carousel items
  sidebarContent += '<div id="carouselControls" class="carousel slide" data-bs-ride="carousel">';
  sidebarContent += '<div class="carousel-inner">';

  // Add carousel indicators
  sidebarContent += '<ol class="carousel-indicators">';
  for (let i = 0; i < listing.locationImages.length; i++) {
    sidebarContent += '<li data-bs-target="#carouselControls" data-bs-slide-to="' + i + '"' + (i === 0 ? ' class="active"' : '') + '></li>';
  }
  sidebarContent += '</ol>';

  for (let i = 0; i < listing.locationImages.length; i++) {
    sidebarContent += '<div class="carousel-item' + (i === 0 ? ' active' : '') + '">';
    sidebarContent += '<img src="' + listing.locationImages[i] + '" class="d-block w-100" draggable="false" alt="...">';
    sidebarContent += '</div>';
  }

  // Add carousel left/right controls
  sidebarContent += '</div>';
  sidebarContent += '<button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">';
  sidebarContent += '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
  sidebarContent += '<span class="visually-hidden">Previous</span>';
  sidebarContent += '</button>';
  sidebarContent += '<button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">';
  sidebarContent += '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
  sidebarContent += '<span class="visually-hidden">Next</span>';
  sidebarContent += '</button>';
  sidebarContent += '</div>';
  sidebarContent += '</div>';
  sidebarContent += '</div>';
  sidebarContent += '</div>';

  // Add title, description, and price information


  sidebar.setContent(sidebarContent);
}

function createCard(listing) {
  // Create card
  const card = document.createElement('div');
  card.classList.add('card', 'mb-4', 'border-light');
  card.setAttribute('onclick', 'handleCardClick(' + JSON.stringify(listing, getCircularReplacer()) + ')');
  card.setAttribute('style', 'cursor: pointer;');

  // Create card image+
  const image = document.createElement('img');
  image.classList.add('card-img-top');
  image.setAttribute('draggable', 'false');
  image.src = listing.locationImages[0]
  image.alt = listing.name;
  card.appendChild(image);

  // Create card body
  const body = document.createElement('div');
  body.classList.add('card-body', 'text-light', 'bg-dark', 'rounded-bottom');
  card.appendChild(body);

  // Create card title
  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = listing.title;
  body.appendChild(title);

  // Create card description
  const description = document.createElement('p');
  description.classList.add('card-text');
  description.textContent = listing.description;
  body.appendChild(description);

  // Create card price
  const price = document.createElement('p');
  price.classList.add('card-text', 'fw-bold');
  price.textContent = '$' + listing.price;
  body.appendChild(price);

  // Add click event listener to card
  card.addEventListener('click', function () {
    handleCardClick(listing);
  });
  
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
    // Align text to center of sidebar
    sidebarContent = '<h3 class="text-center">No listings found within the current map bounds.</h3>';
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
    locationImages: ["https://pbs.twimg.com/media/E2zf1ZTWYAcJC4x?format=jpg&name=large"]
  },
  {
    id: 2,
    title: "Listing 2",
    description: "This is the second listing.",
    price: 200,
    location: { x: 2750, y: 64, z: 4153 },
    marker: null,
    markerImage: null,
    locationImages: ["https://i.ytimg.com/vi/QNgYQanbReE/maxresdefault.jpg", "https://topg.org/gallery/370922/64834.png"]
  },
  {
    id: 3,
    title: "Listing 3",
    description: "This is the third listing.",
    price: 300,
    location: { x: 2800, y: 64, z: 4153 },
    marker: null,
    markerImage: null,
    locationImages: ["https://topg.org/gallery/350820/35678.png"]
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