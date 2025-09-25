// Replace with your Apps Script Web App deployment link
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbygm0jDIK-Q5DuZPNfrxZhRfTt2tYr0ovMi1fpA0AhbDJ9l4sZtS1le-QpP-tOFo1wM6A/exec";

function logVisitor() {
  const visitorId = localStorage.getItem("visitorId") || crypto.randomUUID();
  localStorage.setItem("visitorId", visitorId);

  fetch("https://ipapi.co/json/") // for IP + location
    .then(res => res.json())
    .then(data => {
      const ip = data.ip;
      const loc = `${data.city}, ${data.country_name}`;
      const ua = navigator.userAgent;
      const localTime = new Date().toString();

      fetch(`${SCRIPT_URL}?ip=${encodeURIComponent(ip)}&ua=${encodeURIComponent(ua)}&loc=${encodeURIComponent(loc)}&visitorId=${encodeURIComponent(visitorId)}&localTime=${encodeURIComponent(localTime)}`);
    });
}
logVisitor();
