// Replace with your Google Apps Script Web App URL
const API_URL = 'https://script.google.com/macros/s/AKfycby8XBVlPLiTdBid1jxRQpkl71i7aWlPmgBbGpWCYcRjK-190sU2obHKkVZRyxyzMpK4YA/exec';

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
