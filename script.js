document.addEventListener('DOMContentLoaded', () => {
    const camera = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture-button');
    const capturedImage = document.getElementById('captured-image');
    const locationDisplay = document.getElementById('location');
    const context = canvas.getContext('2d');

    // Access the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                camera.srcObject = stream;
            })
            .catch(err => {
                console.error("Error accessing camera: ", err);
            });
    } else {
        console.error("getUserMedia not supported.");
    }

    // Capture the image
    captureButton.addEventListener('click', () => {
        // Set canvas dimensions to match the video dimensions
        canvas.width = camera.videoWidth;
        canvas.height = camera.videoHeight;
        context.drawImage(camera, 0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a data URL and display it
        const dataURL = canvas.toDataURL('image/jpeg');
        capturedImage.src = dataURL;
        capturedImage.style.display = 'block';
    });

    // Get user location automatically
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                locationDisplay.textContent = `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`;
            },
            error => {
                locationDisplay.textContent = 'Unable to retrieve location';
            }
        );
    } else {
        locationDisplay.textContent = 'Geolocation is not supported by this browser';
    }
});