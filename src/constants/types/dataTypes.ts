export type item = {
  name: string;
  price: number;
  originalPrice: number;
  img: string;
  shop: {
    lat: number;
    location: string;
    name: string;
    lng: number;
    shopRef: string;
    shopUID: string;
  };
  ref: string;
  uid: string;
};
