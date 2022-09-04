import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    language: "es",
    access_token:
      "pk.eyJ1IjoiZzFhbGV4YW5kZXIiLCJhIjoiY2w3bWhtaXRtMWEyZDN5bXFmZXl3M2x0cCJ9.ztYp1Q4WIa5NW0R3DdsYfw",
    limit: 3,
  },
});

export default searchApi;
