import { Address as AddressType } from 'services/types';
import { LngLatLike } from 'mapbox-gl';

const Address = {
  street: (address: AddressType) => `${address.address1}\n${address.address2}`,
  region: (address: AddressType) =>
    `${address.city}, ${address.state} ${address.postalCode}`,
  full: (address: AddressType) =>
    `${Address.street(address)}\n${Address.region(address)}`,
  toGeocode: (address: AddressType) =>
    new Promise<LngLatLike | undefined>((resolve, reject) => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          Formatters.Address.full(address)
        )}.json?proximity=ip&types=address&access_token=${
          process.env.MAPBOX_API_KEY
        }&limit=1`
      )
        .then((response) => response.json())
        .then((response) =>
          resolve(response?.features?.[0]?.geometry?.coordinates)
        )
        .catch((error) => reject(error));
    }),
};

const Formatters = {
  Address,
};

export default Formatters;
