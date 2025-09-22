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
