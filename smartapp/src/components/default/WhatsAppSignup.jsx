import { useEffect } from "react";

export default function WhatsAppSignup() {
  useEffect(() => {
    // Load FB SDK asynchronously
    const loadFbSdk = () => {
      if (document.getElementById("facebook-jssdk")) return;

      const js = document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      document.body.appendChild(js);
    };

    loadFbSdk();

    // Init FB SDK when ready
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1449627456212571", // your app ID
        autoLogAppEvents: true,
        xfbml: true,
        version: "v22.0", // Graph API version
      });
    };

    // Listen for WA signup events
    const messageHandler = (event) => {
      if (!event.origin.endsWith("facebook.com")) return;
      try {
        const data = JSON.parse(event.data);
        if (data.type === "WA_EMBEDDED_SIGNUP") {
          console.log("message event: ", data);
          // your code goes here
        }
      } catch {
        console.log("message event: ", event.data);
        // your code goes here
      }
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  // Callback after FB login
  const fbLoginCallback = (response) => {
    if (response.authResponse) {
      const code = response.authResponse.code;
      console.log("response: ", code);
      // your code goes here
    } else {
      console.log("response: ", response);
      // your code goes here
    }
  };

  // Trigger WhatsApp signup
  const launchWhatsAppSignup = () => {
    if (!window.FB) {
      console.error("FB SDK not loaded yet!");
      return;
    }

    window.FB.login(fbLoginCallback, {
      config_id: "1980429302714618", // your configuration ID
      response_type: "code",
      override_default_response_type: true,
      extras: {
        version: "v3",
        setup: {},
        features: [{ name: "app_only_install" }],
        featureType: "whatsapp_business_app_onboarding",
        sessionInfoVersion: "3",
      },
    });
  };

  return (
    <div>
      <button
        onClick={launchWhatsAppSignup}
        className="btn btn-success btn-sm"
        style={{
          backgroundColor: "#25D366",
          borderColor: "#25D366",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 600,
        }}
      >
        <i className="fab fa-whatsapp" style={{ fontSize: 18 }} />
        Signup for new WhatsApp
      </button>
    </div>
  );
}
