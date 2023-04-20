function getListings() {
  return fetch('http://localhost:3000/listings')
    .then(async res => {
      const listings = await res.json();
      createLatLngData(listings);
      return listings;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
}

function createLatLngData(listings) {
  // Find all listings with no lat/lng
  const listingsWithoutLatLng = listings.filter(listing => listing.lat === null && listing.lng === null);

  // Convert their x, y, z to lat, lng
  const listingsWithLatLng = listingsWithoutLatLng.map(listing => {
    const latlng = fromLocationToLatLng({ x: listing.x, y: listing.y, z: listing.z }, 1, 6);
    listing.lat = latlng.lat;
    listing.lng = latlng.lng;
    return listing;
  });

  // Update the database with the new lat, lng
  listingsWithLatLng.forEach(listing => {
    fetch('http://localhost:3000/latlng', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "id": listing.id, "lat": listing.lat, "lng": listing.lng }),
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

async function createMarkers() {
  const listings = await getListings();

  // Get custom marker icons
  const icons = getMarkerIcons(listings);

  // Create markers
  listings.forEach(listing => {
    L.marker([listing.lat, listing.lng])
      .addTo(map);
  });

  console.log(listings);
};

createMarkers();

function getMarkerIcons(listings) {
  const leafIcon = L.Icon.extend({
    options: {
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }
  });

  // Get all unique icons but skip empty strings
  const uniqueIcons = [...new Set(listings.map(listing => listing.icon))].filter(icon => icon !== '');

  // Create a dictionary of icons
  if (uniqueIcons.length === 0) {
    const icons = {};
    uniqueIcons.forEach(icon => {
      icons[icon] = new leafIcon({ iconUrl: `img/markers/${icon}.png` });
    });
    icons['default'] = new leafIcon({ iconUrl: `https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/${L.Icon.Default.prototype.options.iconUrl}` });

    console.log(icons);
    return icons;
  } else {
    return null;
  }
}

/*
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

async function createMarkers() {
  const listings = await getListings();

  // Create markers
  console.log(listings);
};

function cardClickDesc(listing) {
  let sidebarContent = `
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-4 border-light">
          <div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <ol class="carousel-indicators">
  `;

  // Add carousel indicators
  for (let i = 0; i < listing.locationImages.length; i++) {
    sidebarContent += `
      <li data-bs-target="#carouselControls" data-bs-slide-to="${i}" ${i === 0 ? 'class="active"' : ''}></li>
    `;
  }

  sidebarContent += `
              </ol>
  `;

  // Add carousel images
  for (let i = 0; i < listing.locationImages.length; i++) {
    sidebarContent += `
      <div class="carousel-item${i === 0 ? ' active' : ''}">
        <img src="${listing.locationImages[i]}" class="d-block w-100" draggable="false" alt="...">
      </div>
    `;
  }

  // Add carousel controls
  sidebarContent += `
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

  // Add listing details
  sidebarContent += `
  <div class="row">
    <div class="col-md-12">
      <h3>${listing.title}</h3>
      <p class="lead">${listing.description}</p>
      <div class="d-flex align-items-center">
        <i class="bi bi-tags" style="font-size: 1rem;"></i> <p class="fw-bold mb-0 ms-2" style="font-size: 1rem;">$${listing.price}</p>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-building-add" style="font-size: 1rem;"></i> <p class="fw-bold mb-0 ms-2" style="font-size: 1rem;">Listed on ${listing.listedOn}</p>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-geo-alt" style="font-size: 1rem;"></i> <p class="fw-bold mb-2 ms-2" style="font-size: 1rem;">Located at ${listing.location.x}, ${listing.location.y}, ${listing.location.z}</p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <button type="button" class="btn btn-outline-light" onclick="onListing = false; updateListings()">
        <i class="bi bi-arrow-left-circle"></i> Back to listings
      </button>
    </div>
  </div>
`;

  onListing = true;
  sidebar.setContent(sidebarContent);
}

function createCard(listing) {
  // Create card
  const card = document.createElement('div');
  card.classList.add('card', 'mb-4', 'border-light');
  card.setAttribute('onclick', 'cardClickDesc(' + JSON.stringify(listing, getCircularReplacer()) + ')');
  card.setAttribute('style', 'cursor: pointer;');

  // Create card images
  const image = document.createElement('img');
  image.classList.add('card-img-top');
  image.setAttribute('draggable', 'false');
  image.src = listing.locationImages[0];
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
  price.classList.add('card-text');
  price.textContent = '$' + listing.price;
  body.appendChild(price);

  // Add click event listener to card
  card.addEventListener('click', function () {
    cardClickDesc(listing);
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
    sidebarContent = '';
    sidebarContent += '<div class="d-flex flex-column min-vh-100 justify-content-center align-items-center text-center">';
    sidebarContent += '<h3>No listings found within the current map bounds.</h3>';
    sidebarContent += '</div>';
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
    locationImages: ["https://pbs.twimg.com/media/E2zf1ZTWYAcJC4x?format=jpg&name=large"],
    listedOn: "2021-07-01"
  },
  {
    id: 2,
    title: "Listing 2",
    description: "This is the second listing.",
    price: 200,
    location: { x: 2750, y: 64, z: 4153 },
    marker: null,
    markerImage: null,
    locationImages: ["https://i.ytimg.com/vi/QNgYQanbReE/maxresdefault.jpg", "https://topg.org/gallery/370922/64834.png"],
    listedOn: "2021-07-02"
  },
  {
    id: 3,
    title: "Listing 3",
    description: "This is the third listing.",
    price: 300,
    location: { x: 2800, y: 64, z: 4153 },
    marker: null,
    markerImage: null,
    locationImages: ["https://topg.org/gallery/350820/35678.png"],
    listedOn: "2021-07-03"
  }
];

// Variable to check if on/clicked a listing description
var onListing = false;

// Create markercluster group
const markersCluster = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true
});

// Create all the markers on map load
createMarkers();

// Update the listings on map move if not on a listing
/*map.on('move', function () {
  if (!onListing) {
    updateListings();
  }
});

// Initial update of listings
updateListings();*/