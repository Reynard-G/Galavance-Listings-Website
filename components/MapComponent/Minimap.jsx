import { useMemo, useCallback, useState } from "react";
import { useMap, useMapEvent, MapContainer, TileLayer, Rectangle } from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap],
  );
  useMapEvent('click', onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [onChange]);
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={{ weight: 1 }} color="#06B7DB" />;
}

const Minimap = ({ crs, zoom }) => {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 128, width: 128 }}
        center={parentMap.getCenter()}
        crs={crs}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://tiles.milklegend.xyz/cityrp/{z}/{x}/{y}.webp" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [crs, mapZoom, parentMap],
  );

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
};

export default Minimap;