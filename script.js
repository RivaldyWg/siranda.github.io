document.addEventListener('DOMContentLoaded', () => {
    const camera = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture-button');
    const capturedImage = document.getElementById('captured-image');
    const locationDisplay = document.getElementById('location');
    const context = canvas.getContext('2d');

  <meta name='viewport' content='width=device-width, initial-scale=1'/><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capture Photo and Location</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Capture Photo and Location</h1>
        <input type="file" id="cameraInput" accept="image/*" capture="environment">
        <button id="captureBtn">Capture</button>
        <div id="location"></div>
        <img id="photo" src="" alt="Captured Photo">
    </div>
    <script src="script.js"></script>
</body>
</html><style>body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #00f260, #0575e6);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    color: #fff;
}

.container {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    max-width: 90%;
    width: 400px;
    box-sizing: border-box;
}

h1 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #e0e0e0;
}

input[type="file"] {
    display: block;
    margin: 20px auto;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    color: #fff;
    padding: 10px;
    cursor: pointer;
}

input[type="file"]::-webkit-file-upload-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

button {
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background: linear-gradient(135deg, #00f260, #0575e6);
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
    background: linear-gradient(135deg, #0575e6, #00f260);
    transform: translateY(-2px);
}

button:active {
    transform: translateY(1px);
}

#photo {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

#location {
    margin-top: 10px;
    font-size: 16px;
    color: #e0e0e0;
}

/* Responsive Design */
@media (max-width: 600px) {
    button {
        font-size: 14px;
        padding: 10px 20px;
    }

    h1 {
        font-size: 1.5em;
    }
}</style><script>document.addEventListener('DOMContentLoaded', (event) => {
    const cameraInput = document.getElementById('cameraInput');
    const photo = document.getElementById('photo');
    const locationDiv = document.getElementById('location');

    // Handle camera capture
    cameraInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photo.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle location access
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            locationDiv.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        locationDiv.innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                locationDiv.innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                locationDiv.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                locationDiv.innerHTML = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                locationDiv.innerHTML = "An unknown error occurred.";
                break;
        }
    }

    // Attach event to capture button
    document.getElementById('captureBtn').addEventListener('click', () => {
        getLocation();
    });
});</script>
