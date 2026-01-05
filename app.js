let map  L.map('map').setView([40.33, -75.93], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

Papa.parse("data/stops.txt", {
  download: true,
  header: true,
  complete: function(results) {
    results.data.forEach(stop => {
      L.marker([parseFloat(stop.stop_lat), parseFloat(stop.stop_lon)])
      .addTo(map)
      .bindPopup(stop.stop_name);
    });
  }
});
