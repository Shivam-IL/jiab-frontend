export const pageview = (url: string) => {
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.gtag?.("event", "page_view", {
      page_path: url,
    });
  }
};

export const triggerGAEvent = (eventName: string) => {
  console.log("GA Event Triggered =====> ", eventName);
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.gtag?.("event", eventName);
  }
};
