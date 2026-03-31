let map, directionsService, directionsRenderer;

function initMap() {
  document.getElementById("username").innerText = localStorage.getItem("user");

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.6139, lng: 77.2090 },
    zoom: 12
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ map, draggable: true });
}

function calculateRoute() {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const mode = document.getElementById("mode").value;

  if (!start || !end) {
    alert("Enter both locations!");
    return;
  }

  directionsService.route({
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode[mode],
    provideRouteAlternatives: true
  }, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);

      const route = result.routes[0].legs[0];
      document.getElementById("details").innerHTML = `
        <h3>Route Info</h3>
        <p>From: ${route.start_address}</p>
        <p>To: ${route.end_address}</p>
        <p>Distance: ${route.distance.text}</p>
        <p>Duration: ${route.duration.text}</p>
        <p>Mode: ${mode}</p>
        <p>💧 Water Break every ${(route.distance.value / 2000).toFixed(0)} km</p>
      `;
    } else {
      alert("Could not display directions: " + status);
    }
  });
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
