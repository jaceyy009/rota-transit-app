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
        .bindPopup(`<b>${stop.stop_name}</b><br>Loading departures...`)
        .on("click", () => loadDepartures(stop.stop_id));
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

function loadDepartures(stopId) {
  fetch("https://legendary-spork-j6q75wqrj9gfq7jw-8080.app.github.dev/gtfs-rt/trip-updates")
  .then(res => res.arrayBuffer())
  .then(buffer => {
    // Placeholder for now
        alert("Departures will show here for stop " + stopId);
  });
}

function loadAlerts() {
  fetch("https://legendary-spork-j6q75wqrj9gfq7jw-8080.app.github.dev/gtfs-rt/service-alerts")
  .then(res => res.arrayBuffer())
  .then(() => {
    document.getElementById("alertList").innerHTML = "<li>No active alerts</li>";
  });
}

loadAlerts();
