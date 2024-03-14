import { useContext, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { isMobile } from 'react-device-detect';
import Minimap from '@components/MapComponent/Minimap';

import ListingsContext from '@context/ListingsContext';

L.Projection.Minecraft = {
  project: function (latlng) {
    return new L.Point(latlng.lat, latlng.lng);
  },

  unproject: function (point) {
    return new L.LatLng(point.x, point.y);
  },
};

L.CRS.Minecraft = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.Minecraft,
  transformation: new L.Transformation(1 / 32, 0, 1 / 32, 0),
});

const MapComponent = () => {
  const { listings, filteredListings, setListingsInBounds } = useContext(ListingsContext);
  const animateRef = useRef(true);

  const getListingsInBounds = (e) => {
    if (isMobile) return;
    const bounds = e.target.getBounds();
    const listingsInBounds = listings.filter(listing => bounds.contains(listing.location));
    setListingsInBounds(listingsInBounds);
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        // Set view to clicked location
        const map = e.target;
        map.setView(e.latlng, map.getZoom(), { animate: animateRef.current || false });
      },
      moveend(e) {
        getListingsInBounds(e);
      },
      zoomlevelschange(e) {
        getListingsInBounds(e);
      }
    });
    return false;
  };

  return (
    <MapContainer
      center={[3000, 3000]}
      zoom={2}
      scrollWheelZoom={true}
      attributionControl={false}
      crs={L.CRS.Minecraft}
      className="w-0 h-screen md:w-2/3 z-0"
    >
      <TileLayer
        url="https://tiles.milklegend.xyz/cityrp/{z}/{x}/{y}.webp"
        minZoom={2}
        maxZoom={7}
        bounds={[[0, 0], [6000, 6000]]}
        noWrap={true}
      />
      {filteredListings.map((listing) => (
        <Marker
          key={listing.plot}
          position={listing.location}
          eventHandlers={{
            click: () => window.open(`/properties/${listing.plot}`, '_blank'),
          }}
          icon={
            L.divIcon({
              className: 'marker-container',
              html: `<div class="marker ${listing.status === 'For Sale' ? 'marker-sale' : 'marker-rent'}">${listing.plot}</div>`,
              iconSize: [40, 20],
              iconAnchor: [20, 20],
            })
          }
        >
        </Marker>
      ))}
      <Minimap crs={L.CRS.Minecraft} />
      <MapEvents />
    </MapContainer>
  );
};

export default MapComponent;