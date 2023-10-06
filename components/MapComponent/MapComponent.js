import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

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

const MapComponent = ({ listings, setListingsInBounds }) => {
  const getListingsInBounds = (e) => {
    const bounds = e.target.getBounds();
    const listingsInBounds = listings.filter(listing => bounds.contains(listing.location));
    setListingsInBounds(listingsInBounds);
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        console.log(`${e.latlng.lat}, ${e.latlng.lng}`);
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
      center={[2725, 4153]}
      zoom={6}
      scrollWheelZoom={true}
      attributionControl={false}
      crs={L.CRS.Minecraft}
      className="w-full h-screen md:w-2/3"
    >
      <TileLayer
        url="https://tiles.milklegend.xyz/{z}/{x}/{y}.png"
        minZoom={2}
        maxZoom={7}
        bounds={[[0, 0], [6000, 6000]]}
        noWrap={true}
      />
      {listings.map((listing) => (
        <Marker
          key={listing.plot}
          position={listing.location}
          eventHandlers={{
            click: () => window.open(`/properties/${listing.plot}`, '_blank'),
          }}
          icon={
            L.divIcon({
              className: 'marker-container',
              html: `<div class="marker">${listing.plot}</div>`,
              iconSize: [40, 20],
              iconAnchor: [20, 20],
            })
          }
        >
        </Marker>
      ))
      }
      <MapEvents />
    </MapContainer>
  );
};

export default MapComponent;