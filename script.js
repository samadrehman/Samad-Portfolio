(function() {
  const BACKEND = "https://script.google.com/macros/s/AKfycbxw3nquLfCcMHXyEINMQiZwcb8vUULD0-3TXbsn_v4aN9UsonmkLUvXG-EF-75gPaxwwA/exec"; // paste URL from Step 3
  const start = Date.now();

  // get visitor IP
  async function getIP() {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch {
      return "Unknown";
    }
  }

  // log visit
  async function logVisit(action="load") {
    const ip = await getIP();
    const duration = action === "unload" ? Math.round((Date.now() - start) / 1000) : "";

    const payload = {
      ip,
      ua: navigator.userAgent,
      page: location.pathname,
      action,
      duration
    };

    // Use sendBeacon for unload
    if (action === "unload" && navigator.sendBeacon) {
      navigator.sendBeacon(BACKEND, JSON.stringify(payload));
    } else {
      fetch(BACKEND, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
  }

  // log on load
  window.addEventListener("load", () => logVisit("load"));

  // log on unload
  window.addEventListener("beforeunload", () => logVisit("unload"));
})();
