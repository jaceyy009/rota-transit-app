// Create map
const map = L.map('map').setView([40.33, -75.93], 12);

// OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Load stops
Papa.parse("data/stops.txt", {
  download: true,
  header: true,
  complete: function (results) {
    results.data.forEach(stop => {
      if (!stop.stop_lat || !stop.stop_lon) return;

      L.marker([+stop.stop_lat, +stop.stop_lon])
        .addTo(map)
        .bindPopup(stop.stop_name);
    });
  }
});
