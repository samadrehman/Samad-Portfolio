async function logVisitor() {
  try {
    // Prevent duplicate logs in same session
    if (localStorage.getItem("visitorLogged")) {
      console.log("Already logged in this browser session.");
      return;
    }

    // Get visitor IP
    let ipResponse = await fetch("https://api.ipify.org?format=json");
    let ipData = await ipResponse.json();
    let visitorIP = ipData.ip;

    // Get browser user agent
    let userAgent = navigator.userAgent;

    // Send data to Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbzswoLBFeKB4C4u9diSwVcy18pNXrSXbmpYvgMD2_Uc5A3mv_KLZD2Zslv3u_a2K8dADQ/exec?ip=" 
          + encodeURIComponent(visitorIP) 
          + "&ua=" + encodeURIComponent(userAgent), {
      method: "GET",
      mode: "no-cors"
    });

    // Mark as logged
    localStorage.setItem("visitorLogged", "true");
    console.log("Visitor logged once per session.");

  } catch (err) {
    console.error("Visitor logging error:", err);
  }
}

logVisitor();
