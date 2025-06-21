declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      eventName: string,
      parameters?: Record<string, any>
    ) => void;
  }
}

export {}; 