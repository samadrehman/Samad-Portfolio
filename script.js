(function() {
  const MOBILE_PAGE = "mobile.html";

  function isMobileStrict() {
    const ua = navigator.userAgent || "";
    const platform = navigator.platform || "";

    console.log("UserAgent:", ua);
    console.log("Platform:", platform);
    console.log("MaxTouchPoints:", navigator.maxTouchPoints);

    // Common mobile detection
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
      console.log("🚨 Mobile detected by regex");
      return true;
    }

    // iPad masquerading as Mac
    if (platform === "MacIntel" && navigator.maxTouchPoints > 1) {
      console.log("🚨 iPad detected");
      return true;
    }

    console.log("✅ Desktop detected");
    return false;
  }

  if (isMobileStrict()) {
    console.log("Redirecting to:", MOBILE_PAGE);
    window.location.replace(MOBILE_PAGE);
  }
})();

(async function logVisitor() {
  const endpoint = "https://script.google.com/macros/s/AKfycbw6cPVK2JSKIXXYbkLj0X9CxFkYj_sqmj7RlsXD-SczXJIA-Kx1WA_hVmfk9wNsu16bJw/exec";

  try {
    // 1) fetch public IP
    const ipResp = await fetch("https://api.ipify.org?format=json");
    const ipJson = await ipResp.json().catch(()=>({ ip: "unknown" }));

    // 2) build payload
    const payload = {
      ip: ipJson.ip || "unknown",
      userAgent: navigator.userAgent || "unknown",
      url: window.location.href,
      referrer: document.referrer || "direct",
      ts: new Date().toISOString()
    };

    // 3) POST to your Apps Script web app
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "cors"
    });

    // optional: check response
    if (!res.ok) {
      console.warn("Logging failed HTTP:", res.status);
    } else {
      // you can uncomment to debug:
      // const json = await res.json().catch(()=>null);
      // console.log("Logged:", json);
    }
  } catch (err) {
    console.error("Visitor logging error:", err);
  }
})();

