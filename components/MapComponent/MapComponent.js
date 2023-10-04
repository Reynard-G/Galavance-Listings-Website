import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

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
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        console.log(`${e.latlng.lat}, ${e.latlng.lng}`);
      },
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
      style={{ height: '100vh', width: '66.66667vw', cursor: 'default' }}
    >
      <TileLayer
        url="https://tiles.milklegend.xyz/{z}/{x}/{y}.png"
        minZoom={2}
        maxZoom={7}
        bounds={[[0, 0], [6000, 6000]]}
        noWrap={true}
      />
      <MapEvents />
    </MapContainer>
  );
};

export default MapComponent;