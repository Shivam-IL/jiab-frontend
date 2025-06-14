"use client";

import { useState, useEffect } from "react";
import useFCMToken from "@/hooks/useFCMToken";
import useAppSelector from "@/hooks/useSelector";

const FCMTestButton: React.FC = () => {
  const { isAuthenticated, token: authToken } = useAppSelector(
    (state) => state.auth
  );
  const {
    token,
    isLoading,
    error,
    isRegistered,
    isRegistering,
    permissionStatus,
    serviceWorkerRegistered,
    isAuthenticated: fcmAuthState,
    initializeFCM,
    refreshToken,
    testNotification,
  } = useFCMToken();

  const [showDetails, setShowDetails] = useState(false);
  const [serviceWorkerLogs, setServiceWorkerLogs] = useState<string[]>([]);
  const [debugInfo, setDebugInfo] = useState({
    vapidKey: "",
    swActive: false,
    swWaiting: false,
    swInstalling: false,
  });

  useEffect(() => {
    // Check debug information
    const checkDebugInfo = async () => {
      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "Not Set";

      let swActive = false;
      let swWaiting = false;
      let swInstalling = false;

      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration(
            "/firebase-messaging-sw.js"
          );
          if (registration) {
            swActive = !!registration.active;
            swWaiting = !!registration.waiting;
            swInstalling = !!registration.installing;
          }
        } catch (error) {
          console.error("Error checking service worker:", error);
        }
      }

      setDebugInfo({
        vapidKey: vapidKey.substring(0, 20) + "...",
        swActive,
        swWaiting,
        swInstalling,
      });
    };

    checkDebugInfo();
  }, [serviceWorkerRegistered]);

  useEffect(() => {
    // Listen for service worker console messages
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    const interceptConsole =
      (level: "log" | "error") =>
      (originalFn: any) =>
      (...args: any[]) => {
        originalFn(...args);
        const message = args.join(" ");
        if (message.includes("[firebase-messaging-sw.js]")) {
          setServiceWorkerLogs((prev) => [
            ...prev.slice(-20),
            `[${level.toUpperCase()}] ${message}`,
          ]);
        }
      };

    console.log = interceptConsole("log")(originalConsoleLog);
    console.error = interceptConsole("error")(originalConsoleError);

    return () => {
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
    };
  }, []);

  const copyTokenToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      alert("Token copied to clipboard!");
    }
  };

  const checkNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      console.log("Permission result:", permission);
      alert(`Permission: ${permission}`);
    } else {
      alert("Notifications not supported");
    }
  };

  const sendTestPushNotification = async () => {
    if (!token) {
      alert("No FCM token available. Please initialize FCM first.");
      return;
    }

    // This is a mock function - you would typically call your backend to send the notification
    console.log(
      "To send a test notification, use this token with Firebase Admin SDK:",
      token
    );
    alert(
      `Token ready for testing: ${token.substring(
        0,
        20
      )}...\nCheck console for full token.`
    );
  };

  const clearServiceWorkerLogs = () => {
    setServiceWorkerLogs([]);
  };

  const refreshServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration(
          "/firebase-messaging-sw.js"
        );
        if (registration) {
          await registration.update();
          console.log("Service worker updated");
          alert("Service worker refreshed!");
        }
      } catch (error) {
        console.error("Error refreshing service worker:", error);
        alert("Error refreshing service worker");
      }
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-lg max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          🔔 FCM Push Notification Debugger
        </h2>
        <p className="text-gray-600">
          Test and debug Firebase Cloud Messaging integration
        </p>
      </div>

      {/* Authentication Status */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="font-semibold mb-3">🔐 Authentication Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-3 rounded text-center ${
              isAuthenticated
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-red-100 text-red-800 border-red-200"
            } border`}
          >
            <div className="font-semibold">{isAuthenticated ? "✅" : "❌"}</div>
            <div className="text-sm">App Authenticated</div>
          </div>

          <div
            className={`p-3 rounded text-center ${
              authToken
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-red-100 text-red-800 border-red-200"
            } border`}
          >
            <div className="font-semibold">{authToken ? "🔑" : "❌"}</div>
            <div className="text-sm">Auth Token Available</div>
            {authToken && (
              <div className="text-xs mt-1">
                {authToken.substring(0, 10)}...
              </div>
            )}
          </div>

          <div
            className={`p-3 rounded text-center ${
              fcmAuthState
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-red-100 text-red-800 border-red-200"
            } border`}
          >
            <div className="font-semibold">{fcmAuthState ? "🔔" : "❌"}</div>
            <div className="text-sm">FCM Auth Ready</div>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-200 rounded text-yellow-800">
            <strong>⚠️ Authentication Required:</strong> Please login to enable
            push notifications.
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <button
          onClick={initializeFCM}
          disabled={isLoading || isRegistering || !isAuthenticated}
          className={`px-4 py-2 rounded text-white transition-colors ${
            isLoading || isRegistering || !isAuthenticated
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading || isRegistering ? "Processing..." : "Initialize FCM"}
        </button>

        <button
          onClick={refreshToken}
          disabled={isLoading || isRegistering || !isAuthenticated}
          className={`px-4 py-2 rounded text-white transition-colors ${
            isLoading || isRegistering || !isAuthenticated
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Refresh Token
        </button>

        <button
          onClick={testNotification}
          disabled={permissionStatus !== "granted"}
          className={`px-4 py-2 rounded text-white transition-colors ${
            permissionStatus !== "granted"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          Test Local Notification
        </button>

        <button
          onClick={checkNotificationPermission}
          className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          Check Permission
        </button>

        <button
          onClick={refreshServiceWorker}
          className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
        >
          Refresh SW
        </button>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div
          className={`p-3 rounded text-center ${
            isRegistered
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          } border`}
        >
          <div className="font-semibold">{isRegistered ? "✅" : "❌"}</div>
          <div className="text-sm">Device Registered</div>
        </div>

        <div
          className={`p-3 rounded text-center ${
            token
              ? "bg-blue-100 text-blue-800 border-blue-200"
              : "bg-gray-100 text-gray-800 border-gray-200"
          } border`}
        >
          <div className="font-semibold">{token ? "📱" : "📵"}</div>
          <div className="text-sm">FCM Token</div>
        </div>

        <div
          className={`p-3 rounded text-center ${
            permissionStatus === "granted"
              ? "bg-green-100 text-green-800 border-green-200"
              : permissionStatus === "denied"
              ? "bg-red-100 text-red-800 border-red-200"
              : "bg-yellow-100 text-yellow-800 border-yellow-200"
          } border`}
        >
          <div className="font-semibold">
            {permissionStatus === "granted"
              ? "🔔"
              : permissionStatus === "denied"
              ? "🔕"
              : "❓"}
          </div>
          <div className="text-sm">
            Permission: {permissionStatus || "Unknown"}
          </div>
        </div>

        <div
          className={`p-3 rounded text-center ${
            serviceWorkerRegistered
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          } border`}
        >
          <div className="font-semibold">
            {serviceWorkerRegistered ? "⚙️" : "❌"}
          </div>
          <div className="text-sm">Service Worker</div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded text-red-700">
          <div className="font-semibold">❌ Error:</div>
          <div className="mt-1">{error}</div>

          {/* Specific error help */}
          {error.includes("not authenticated") && (
            <div className="mt-2 text-sm">
              <strong>Solution:</strong> Please log in to your account first,
              then try initializing FCM again.
            </div>
          )}

          {error.includes("Authorization header is missing") && (
            <div className="mt-2 text-sm">
              <strong>Solution:</strong> Authentication token is missing. Please
              log out and log back in.
            </div>
          )}
        </div>
      )}

      {/* Service Worker Logs */}
      <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold">🔧 Service Worker Logs (Real-time)</h4>
          <button
            onClick={clearServiceWorkerLogs}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Clear Logs
          </button>
        </div>
        <div className="bg-black text-green-400 p-3 rounded max-h-40 overflow-y-auto font-mono text-xs">
          {serviceWorkerLogs.length === 0 ? (
            <div className="text-gray-500">
              Service worker logs will appear here...
            </div>
          ) : (
            serviceWorkerLogs.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Token Actions */}
      {token && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">FCM Token Generated:</span>
            <div className="space-x-2">
              <button
                onClick={copyTokenToClipboard}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Copy Token
              </button>
              <button
                onClick={sendTestPushNotification}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Prepare Test Push
              </button>
            </div>
          </div>
          <code className="text-xs break-all bg-white p-2 rounded border block">
            {token}
          </code>
        </div>
      )}

      {/* Backend Testing Instructions */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h4 className="font-semibold text-yellow-800 mb-3">
          🛠️ Backend Notification Payload Testing
        </h4>
        <p className="text-sm text-yellow-700 mb-3">
          Your backend should send notifications in one of these formats:
        </p>

        <div className="space-y-3">
          <div className="bg-white p-3 rounded border">
            <h5 className="font-semibold text-sm mb-2">
              Format 1: Standard FCM (notification + data)
            </h5>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
              {`{
  "to": "FCM_TOKEN_HERE",
  "notification": {
    "title": "Your notification title",
    "body": "Your notification message",
    "icon": "/icons/icon-192x192.png",
    "click_action": "/notifications"
  },
  "data": {
    "custom_key": "custom_value"
  }
}`}
            </pre>
          </div>

          <div className="bg-white p-3 rounded border">
            <h5 className="font-semibold text-sm mb-2">
              Format 2: Data-only (common for backends)
            </h5>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
              {`{
  "to": "FCM_TOKEN_HERE",
  "data": {
    "title": "Your notification title",
    "body": "Your notification message",
    "notification_title": "Alternative title field",
    "notification_text": "Alternative body field",
    "icon_url": "/icons/icon-192x192.png",
    "click_action": "/notifications"
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Toggle Details */}
      <div className="mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors"
        >
          {showDetails ? "🔼 Hide Details" : "🔽 Show Debug Details"}
        </button>
      </div>

      {/* Detailed Debug Information */}
      {showDetails && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-semibold mb-3">🔧 Configuration Status:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>VAPID Key:</strong> {debugInfo.vapidKey}
              </div>
              <div>
                <strong>Service Worker Active:</strong>{" "}
                {debugInfo.swActive ? "Yes" : "No"}
              </div>
              <div>
                <strong>Service Worker Waiting:</strong>{" "}
                {debugInfo.swWaiting ? "Yes" : "No"}
              </div>
              <div>
                <strong>Service Worker Installing:</strong>{" "}
                {debugInfo.swInstalling ? "Yes" : "No"}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-semibold mb-3">📊 Runtime Status:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>App Authenticated:</strong>{" "}
                {isAuthenticated ? "Yes" : "No"}
              </div>
              <div>
                <strong>Auth Token:</strong>{" "}
                {authToken ? "Available" : "Missing"}
              </div>
              <div>
                <strong>FCM Auth State:</strong>{" "}
                {fcmAuthState ? "Ready" : "Not Ready"}
              </div>
              <div>
                <strong>Loading:</strong> {isLoading ? "Yes" : "No"}
              </div>
              <div>
                <strong>Registering:</strong> {isRegistering ? "Yes" : "No"}
              </div>
              <div>
                <strong>Registered:</strong> {isRegistered ? "Yes" : "No"}
              </div>
              <div>
                <strong>Has Token:</strong> {token ? "Yes" : "No"}
              </div>
              <div>
                <strong>Permission:</strong> {permissionStatus || "Not checked"}
              </div>
              <div>
                <strong>SW Registered:</strong>{" "}
                {serviceWorkerRegistered ? "Yes" : "No"}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-semibold mb-3">🧪 Testing Instructions:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                <strong>Login first:</strong> Ensure you're authenticated before
                testing FCM
              </li>
              <li>
                <strong>Check status:</strong> All authentication and status
                indicators should be green
              </li>
              <li>
                <strong>Copy token:</strong> Use the "Copy Token" button to get
                your FCM token
              </li>
              <li>
                <strong>Test backend:</strong> Send a test notification from
                your backend using the token
              </li>
              <li>
                <strong>Monitor logs:</strong> Watch the "Service Worker Logs"
                section for real-time debugging
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default FCMTestButton;
