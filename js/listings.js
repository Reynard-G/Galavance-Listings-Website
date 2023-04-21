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
      icon: icons[listing.icon] ? icons[listing.icon] : icons['default']
    }).addTo(map);

    marker.on('click', () => {
      createCardDescription(listings, listing);
    });
  });
};

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
  var icons = {};
  icons['default'] = new leafIcon({ iconUrl: `https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/${L.Icon.Default.prototype.options.iconUrl}` });
  if (uniqueIcons.length === 0) {
    const icons = {};
    uniqueIcons.forEach(icon => {
      icons[icon] = new leafIcon({ iconUrl: `img/markers/${icon}.png` });
    });

    return icons;
  } else {
    return icons;
  }
}

async function createCards(listings) {
  try {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    for (let i = 0; i < listings.length; i++) {
      const listing = listings[i];

      const card = document.createElement('div');
      card.classList.add('card', 'mb-4', 'border-light');
      card.setAttribute('onclick', `createCardDescription(${JSON.stringify(listings)}, ${JSON.stringify(listing)})`);
      card.setAttribute('style', 'cursor: pointer;');

      const image = document.createElement('img');
      image.classList.add('card-img-top');
      image.setAttribute('draggable', 'false');
      image.src = listing.images[0].link;
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
      price.textContent = '$' + listing.price;
      body.appendChild(price);

      cardContainer.appendChild(card);
      sidebar.setContent(cardContainer);
    }
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
  for (let i = 0; i < listing.images.length; i++) {
    sidebarContent += `
      <div class="carousel-item${i === 0 ? ' active' : ''}">
        <img src="${listing.images[i].link}" class="d-block w-100" draggable="false" alt="...">
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

  // Convert unix timestamp to browser's local time
  const date = new Date(listing.created_at_unix * 1000);
  const formatter = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedDate = formatter.format(date);

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
        <i class="bi bi-building-add" style="font-size: 1rem;"></i> <p class="fw-bold mb-0 ms-2" style="font-size: 1rem;">Listed on ${formattedDate}</p>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-geo-alt" style="font-size: 1rem;"></i> <p class="fw-bold mb-2 ms-2" style="font-size: 1rem;">Located at ${listing.x}, ${listing.y}, ${listing.z}</p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <button type="button" class="btn btn-outline-light" onclick='updateListings(${JSON.stringify(listings)})'>
        <i class="bi bi-arrow-left-circle"></i> Back to listings
      </button>
    </div>
  </div>
`;

  sidebar.setContent(sidebarContent);
}

function updateListings(listings) {
  // Get current visible bounds of the map
  const bounds = map.getBounds();
  const visibleListings = [];

  // Loop through all listings
  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];

    // Check if the listing marker is within the current bounds of the map
    const latlng = fromLocationToLatLng({ x: listing.x, y: listing.y, z: listing.z }, 1, 6);
    if (bounds.contains(latlng)) {
      visibleListings.push(listing);
      createCards(visibleListings);
    }
  }

  // If there are no visible listings, display a message
  if (visibleListings.length === 0) {
    sidebar.setContent('<h3 class="d-flex flex-column min-vh-100 justify-content-center text-center">No listings found within the current map bounds</h3>');
  }
}

getListings().then((listings) => {
  // Create a marker for each listing
  createMarkers(listings);

  // On map move, update the listings
  map.on('move', () => {
    updateListings(listings);
  });
});