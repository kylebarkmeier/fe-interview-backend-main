import * as React from 'react';
import mapboxgl, { LngLatLike, Map } from 'mapbox-gl';
import { Address } from 'services/types';
import Formatters from 'utils/formatters';
import { Box } from '@mui/system';

const MapBox = ({ address }: { address: Address }): JSX.Element => {
  const mapContainer = React.useRef<HTMLDivElement | string>('');
  const mapbox = React.useRef<Map | null>(null);
  const [longLat, setLongLat] = React.useState<LngLatLike | undefined>();
  React.useEffect(() => {
    Formatters.Address.toGeocode(address).then(
      (longlat: LngLatLike | undefined) => setLongLat(longlat)
    );
  }, [address]);

  React.useEffect(() => {
    if (!mapbox.current && longLat) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: longLat,
        zoom: 9,
      });
      new mapboxgl.Marker().setLngLat(longLat).addTo(map);
      mapbox.current = map;
    }
  }, [longLat, mapContainer.current, mapbox.current]);
  return (
    <Box
      component="figure"
      ref={mapContainer}
      className="map-container"
      sx={{ height: 256, width: 256, m: 0, p: 0 }}
    />
  );
};

export default MapBox;
