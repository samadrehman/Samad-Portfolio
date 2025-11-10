const API_URL = 'https://script.google.com/macros/s/AKfycbwJzt2Z23ol0_dp2skDNy-lD-gCqOInF4NU7MKDxawFdLRbgv1fcOXAPlcsPm-O1swN/exec';

async function logVisitorIP() {
    try {
        // 1️⃣ Get visitor IP
        const ipResp = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResp.json();
        const visitorIP = ipData.ip;

        // 2️⃣ Send IP to Google Sheet
        await fetch(`${API_URL}?ip=${encodeURIComponent(visitorIP)}`, {
            method: 'POST'
        });

        console.log('Visitor IP logged:', visitorIP);
    } catch (err) {
        console.error('Error logging visitor IP:', err);
    }
}

// Run automatically when page loads
window.onload = logVisitorIP;


<script src="https://kit.fontawesome.com/42c784f5cd.js" crossorigin="anonymous"></script>

document.getElementById('subscribeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!navigator.geolocation) {
        alert("Geolocation not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        const data = new URLSearchParams(new FormData(form));
        data.append("latitude", latitude);
        data.append("longitude", longitude);

        const res = await fetch("https://script.google.com/macros/s/AKfycbwJzt2Z23ol0_dp2skDNy-lD-gCqOInF4NU7MKDxawFdLRbgv1fcOXAPlcsPm-O1swN/exec", {
            method: "POST",
            body: data
        });
        const text = await res.text();
        alert(text);
    }, (err) => {
        // Optional: handle errors
        // alert("Unable to get location: " + err.message);
    }, {enableHighAccuracy: true});
});