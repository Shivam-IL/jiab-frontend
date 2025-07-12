importScripts(
  "https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js"
);

importScripts('/firebase-env.js');

firebase.initializeApp(self.FIREBASE_CONFIG);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    JSON.stringify(payload, null, 2)
  );

  // Notify main app to update notification cache
  self.clients
    .matchAll({ includeUncontrolled: true, type: "window" })
    .then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "NOTIFICATION_RECEIVED",
          payload: payload,
        });
      });
    });

  try {
    let notificationTitle = "New Notification";
    let notificationBody = "You have a new message!";
    let notificationIcon = "/icons/icon-192x192.png";
    let notificationBadge = "/icons/icon-72x72.png";
    let clickAction = "/";
    let additionalData = {};

    if (payload.notification) {
      notificationTitle = payload.notification.title || notificationTitle;
      notificationBody = payload.notification.body || notificationBody;
      notificationIcon = payload.notification.icon || notificationIcon;
      clickAction =
        payload.notification.click_action ||
        payload.fcmOptions?.link ||
        clickAction;
    } else if (payload.data) {
      notificationTitle =
        payload.data.title ||
        payload.data.notification_title ||
        notificationTitle;
      notificationBody =
        payload.data.body ||
        payload.data.notification_text ||
        payload.data.message ||
        notificationBody;
      notificationIcon =
        payload.data.icon || payload.data.icon_url || notificationIcon;
      clickAction =
        payload.data.click_action ||
        payload.data.url ||
        payload.data.link ||
        clickAction;

      additionalData = { ...payload.data };
    }

    console.log("[firebase-messaging-sw.js] Extracted notification data:", {
      title: notificationTitle,
      body: notificationBody,
      icon: notificationIcon,
      clickAction: clickAction,
      additionalData: additionalData,
    });

    const notificationOptions = {
      body: notificationBody,
      icon: notificationIcon,
      badge: notificationBadge,
      tag: "jiab-notification-" + Date.now(),
      requireInteraction: false,
      silent: false,
      timestamp: Date.now(),
      data: {
        url: clickAction,
        originalPayload: payload,
        ...additionalData,
      },
      actions: [
        {
          action: "open",
          title: "Open",
          icon: notificationIcon,
        },
        {
          action: "close",
          title: "Close",
          icon: notificationIcon,
        },
      ],
    };

    console.log(
      "[firebase-messaging-sw.js] Showing notification with options:",
      notificationOptions
    );

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  } catch (error) {
    console.error(
      "[firebase-messaging-sw.js] Error processing background message:",
      error,
      "Original payload:",
      payload
    );

    return self.registration.showNotification("New Notification", {
      body: "You have a new message (error in processing)",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      tag: "jiab-notification-error",
      data: {
        url: "/",
        error: error.message,
        originalPayload: payload,
      },
    });
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log(
    "[firebase-messaging-sw.js] Notification clicked:",
    event.notification
  );
  

  event.notification.close();

  const targetUrl = event.notification.data?.url || "/";
  const action = event.action;

  console.log(
    "[firebase-messaging-sw.js] Notification action:",
    action,
    "URL:",
    targetUrl
  );

  if (action === "close") {
    return;
  }

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        console.log(
          "[firebase-messaging-sw.js] Found clients:",
          clientList.length
        );

        for (const client of clientList) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            console.log("[firebase-messaging-sw.js] Focusing existing window");
            return client.focus();
          }
        }

        for (const client of clientList) {
          if ("focus" in client) {
            console.log(
              "[firebase-messaging-sw.js] Focusing existing window and navigating"
            );
            client.focus();
            if ("navigate" in client) {
              return client.navigate(targetUrl);
            } else {
              return client.postMessage({ action: "navigate", url: targetUrl });
            }
          }
        }

        console.log("[firebase-messaging-sw.js] Opening new window");
        return clients.openWindow(targetUrl);
      })
      .catch((error) => {
        console.error(
          "[firebase-messaging-sw.js] Error handling notification click:",
          error
        );
      })
  );
});

self.addEventListener("install", (event) => {
  console.log("[firebase-messaging-sw.js] Service worker installing");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[firebase-messaging-sw.js] Service worker activating");
  event.waitUntil(clients.claim());
});

self.addEventListener("message", (event) => {
  console.log(
    "[firebase-messaging-sw.js] Received message from app:",
    event.data
  );

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("error", (event) => {
  console.error(
    "[firebase-messaging-sw.js] Service worker error:",
    event.error
  );
});

self.addEventListener("unhandledrejection", (event) => {
  console.error(
    "[firebase-messaging-sw.js] Unhandled promise rejection:",
    event.reason
  );
});

console.log("[firebase-messaging-sw.js] Service worker loaded and ready");
