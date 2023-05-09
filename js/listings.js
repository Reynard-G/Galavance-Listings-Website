async function getListings() {
  return fetch('https://panel.milklegend.xyz:3000/listings/images')
    .then(async res => {
      const listings = await res.json();
      return listings;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
}

async function createMarkers(listings) {
  // Create marker cluster group
  var markers = L.markerClusterGroup({
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: true,
  });

  // Get custom marker icons
  const icons = getMarkerIcons(listings);

  // Convert every listing coordinates to a LatLng object
  listings.forEach(listing => {
    if (listing.x !== null && listing.y !== null && listing.z !== null) {
      const latlng = fromLocationToLatLng({ x: listing.x, y: listing.y, z: listing.z }, 1, 6);
      listing.lat = latlng.lat;
      listing.lng = latlng.lng;
    } else {
      console.error(`Listing ${listing.id} has no coordinates! Skipping...`);
      return;
    }
  });

  // Create markers
  listings.forEach(listing => {
    const marker = L.marker([listing.lat, listing.lng], {
      icon: icons[listing.id] ? icons[listing.id] : icons['default']
    });

    // Add marker to cluster group
    markers.addLayer(marker);

    marker.on('click', () => {
      createCardDescription(listings, listing);
    });
  });

  // Add cluster group to map
  map.addLayer(markers);
};

function getMarkerIcons(listings) {
  // Get all unique icons and add the listing id but skip empty strings
  const uniqueIcons = [...new Set(listings.map(listing => {
    var icon = {};
    icon.id = listing.id;
    icon.icon = listing.marker_icon;
    return icon;
  }))]
    .filter(icon => icon !== '');

  const leafIcon = L.Icon.extend({
    options: {
      iconSize: [25, 40],
      iconAnchor: [12.5, 40],
    }
  });

  // Create a dictionary of icons
  var icons = {};
  icons['default'] = new leafIcon({ iconUrl: `https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/${L.Icon.Default.prototype.options.iconUrl}` });
  if (uniqueIcons.length != 0) {
    uniqueIcons.forEach(icon => {
      if (icon.icon == null) return;
      icons[icon.id] = new leafIcon({ iconUrl: icon.icon.link, iconSize: [icon.icon.width, icon.icon.height], iconAnchor: [icon.icon.width / 2, icon.icon.height] });
    });
  }

  return icons;
}

async function createCards(listings) {
  try {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    listings.forEach(listing => {
      const card = document.createElement('div');
      card.classList.add('card', 'mb-4', 'border-light');
      card.setAttribute('onclick', `createCardDescription(${JSON.stringify(listings)}, ${JSON.stringify(listing)})`);
      card.setAttribute('style', 'cursor: pointer;');

      const image = document.createElement('img');
      image.classList.add('card-img-top');
      image.setAttribute('draggable', 'false');
      image.src = listing.images[0] ? listing.images[0].link : 'https://cdn.bootstrapstudio.io/placeholders/1400x800.png';
      image.alt = listing.title;
      card.appendChild(image);

      const body = document.createElement('div');
      body.classList.add('card-body', 'text-light', 'bg-dark', 'rounded-bottom');
      card.appendChild(body);

      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = listing.title;
      body.appendChild(title);

      const description = document.createElement('p');
      description.classList.add('card-text');
      description.textContent = listing.description;
      body.appendChild(description);

      const price = document.createElement('p');
      price.classList.add('card-text');
      const currencyFormatter = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' });
      price.textContent = currencyFormatter.format(listing.price);
      body.appendChild(price);

      cardContainer.appendChild(card);
      sidebar.setContent(cardContainer);
    });

    return cardContainer;
  } catch (error) {
    console.error(error);
  }
}

async function createCardDescription(listings, listing) {
  let sidebarContent = `
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-4 border-light">
          <div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <ol class="carousel-indicators">
  `;

  // Add carousel indicators
  for (let i = 0; i < listing.images.length; i++) {
    sidebarContent += `
      <li data-bs-target="#carouselControls" data-bs-slide-to="${i}" ${i === 0 ? 'class="active"' : ''}></li>
    `;
  }

  sidebarContent += `
              </ol>
  `;

  // Add carousel images
  if (listing.images.length === 0) {
    sidebarContent += `
      <div class="carousel-item active">
        <img src="https://cdn.bootstrapstudio.io/placeholders/1400x800.png" class="d-block w-100" draggable="false" alt="...">
      </div>
    `;
  } else {
    for (let i = 0; i < listing.images.length; i++) {
      sidebarContent += `
      <div class="carousel-item${i === 0 ? ' active' : ''}">
        <img src="${listing.images[i].link}" class="d-block w-100" draggable="false" alt="...">
      </div>
    `;
    }
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

  // Convert unix timestamp to browser's local time
  const date = new Date(listing.created_at_unix * 1000);
  const dateFormatter = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' });
  const currencyFormatter = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' });
  const formattedDate = dateFormatter.format(date);
  const formattedPrice = currencyFormatter.format(listing.price);

  // Add listing details
  sidebarContent += `
  <div class="row">
    <div class="col-md-12">
      <h3>${listing.title}</h3>
      <p class="lead">${listing.description ? URLify(listing.description) : "No description provided"}</p>
      <div class="d-flex align-items-center">
        <i class="bi bi-tags" style="font-size: 1rem;"></i> <p class="fw-bold mb-0 ms-2" style="font-size: 1rem;">${formattedPrice}</p>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-building-add" style="font-size: 1rem;"></i> <p class="mb-0 ms-2" style="font-size: 1rem;">Listed on <span class="fw-bold">${formattedDate}</span></p>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-geo-alt" style="font-size: 1rem;"></i> <p class="mb-2 ms-2" style="font-size: 1rem;">Located at <span class="fw-bold">${listing.x}, ${listing.y}, ${listing.z}</span></p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <button type="button" class="btn btn-outline-light" onclick='updateListings(${JSON.stringify(listings).replace(/'/g, '\\')})'>
        <i class="bi bi-arrow-left-circle"></i> Back to listings
      </button>
    </div>
  </div>
`;

  sidebar.setContent(sidebarContent);
}

function listingsInBounds(listings) {
  // Get current visible bounds of the map
  const bounds = map.getBounds();
  const visibleListings = [];

  // Loop through all listings
  listings.forEach(listing => {
    // Check if the listing marker is within the current bounds of the map
    const latlng = fromLocationToLatLng({ x: listing.x, y: listing.y, z: listing.z }, 1, 6);
    if (bounds.contains(latlng)) {
      visibleListings.push(listing);
    }
  });

  return visibleListings;
}

function updateListings(listings) {
  // Get all listings within the current bounds of the map
  const visibleListings = listingsInBounds(listings);

  // Create cards for all visible listings
  createCards(visibleListings);

  // If there are no visible listings, display a message
  if (visibleListings.length === 0) {
    sidebar.setContent('<h3 class="d-flex flex-column min-vh-100 justify-content-center text-center">No listings found within the current map bounds</h3>');
  }

  return visibleListings;
}

function URLify(string) {
  // Match urls that start with http, https, or www
  const urls = string.match(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g);
  if (urls) {
    // Replace urls with anchor tags
    urls.forEach(url => {
      // Replace url with anchor tag
      string = string.replace(url, `<a href="${url}" target="_blank">${url}</a>`);
    });
  }

  return string;
}

getListings().then((listings) => {
  // Create a marker for each listing
  createMarkers(listings);

  var currentListings, previousListings;

  // On map move, update the listings
  map.on('move', () => {
    currentListings = listingsInBounds(listings);

    // Check if we are currently viewing a listing
    if (sidebar.getContainer().querySelector("button")) return;

    // Check if no new listings have been added
    if (JSON.stringify(currentListings) === JSON.stringify(previousListings)) {
      console.log('No new listings have been added');
      return;
    }

    // Update the listings
    previousListings = updateListings(listings);
  });
});