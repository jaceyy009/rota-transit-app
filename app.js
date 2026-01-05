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

// Load routes into selector
Papa.parse("data/routes.txt", {
  download: true,
  header: true,
  complete: function (results) {
    const select = document.getElementById("routeSelect");

    results.data.forEach(route => {
      if (!route.route_id) return;

      const option = document.createElement("option");
      option.value = route.route_id;
      option.textContent = 
        route.route_short_name
          ? `${route.route_short_name} - ${route.route_long_name}`
          : route.route_long_name;

      select.appendChild(option);
    });
  }
});
