"use client";

import FCMTestButton from "@/components/common/FCMTestButton/FCMTestButton";
import { useEffect, useState } from "react";

const FCMTestPage = () => {
  const [consoleMessages, setConsoleMessages] = useState<string[]>([]);

  useEffect(() => {
    // Capture console messages for debugging
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      originalLog(...args);
      setConsoleMessages((prev) => [
        ...prev.slice(-50),
        `[LOG] ${args.join(" ")}`,
      ]);
    };

    console.error = (...args) => {
      originalError(...args);
      setConsoleMessages((prev) => [
        ...prev.slice(-50),
        `[ERROR] ${args.join(" ")}`,
      ]);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  const clearConsole = () => {
    setConsoleMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">
            🧪 FCM Testing & Debugging
          </h1>
          <p className="text-gray-600 mb-4">
            Use this page to test and debug Firebase Cloud Messaging (FCM) push
            notifications. Follow the steps below to ensure everything is
            working correctly.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <h3 className="font-semibold text-blue-800 mb-2">
              🔧 Quick Setup Checklist:
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>1. ✅ Ensure VAPID key is set in environment variables</li>
              <li>2. ✅ Check that service worker is properly registered</li>
              <li>3. ✅ Grant notification permissions when prompted</li>
              <li>4. ✅ Copy FCM token and test with Firebase Console</li>
            </ul>
          </div>
        </div>

        <FCMTestButton />

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">📋 Console Output</h2>
            <button
              onClick={clearConsole}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Clear Console
            </button>
          </div>

          <div className="bg-black text-green-400 p-4 rounded max-h-96 overflow-y-auto font-mono text-sm">
            {consoleMessages.length === 0 ? (
              <div className="text-gray-500">
                Console messages will appear here...
              </div>
            ) : (
              consoleMessages.map((message, index) => (
                <div key={index} className="mb-1">
                  {message}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            🚀 How to Test Push Notifications
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">
                Method 1: Using Firebase Console
              </h3>
              <ol className="list-decimal list-inside text-sm space-y-1 mt-2">
                <li>
                  Go to{" "}
                  <a
                    href="https://console.firebase.google.com"
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Firebase Console
                  </a>
                </li>
                <li>Select your project → Cloud Messaging</li>
                <li>Click "Send your first message"</li>
                <li>Enter notification title and text</li>
                <li>In "Target" section, select "Single device"</li>
                <li>Paste your FCM token from the debugger above</li>
                <li>Send the notification</li>
              </ol>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">
                Method 2: Using Your Backend API
              </h3>
              <p className="text-sm mt-2">
                Use your backend to call Firebase Admin SDK with the generated
                FCM token. The token is automatically registered with your API
                endpoint.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold">
                Method 3: Local Test Notification
              </h3>
              <p className="text-sm mt-2">
                Click the "Test Local Notification" button above to verify that
                your browser can display notifications (this doesn't use FCM,
                just browser Notification API).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            🐛 Common Issues & Solutions
          </h2>

          <div className="space-y-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <h4 className="font-semibold text-red-800">
                Issue: "Firebase messaging not available"
              </h4>
              <p className="text-sm text-red-700 mt-1">
                Solution: Check that you're running on HTTPS and service worker
                is properly registered.
              </p>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="font-semibold text-yellow-800">
                Issue: "Notification permission denied"
              </h4>
              <p className="text-sm text-yellow-700 mt-1">
                Solution: Clear site data in browser settings and grant
                permission when prompted.
              </p>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <h4 className="font-semibold text-blue-800">
                Issue: "Token generated but no notifications"
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Solution: Check service worker console logs and verify VAPID key
                configuration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FCMTestPage;
