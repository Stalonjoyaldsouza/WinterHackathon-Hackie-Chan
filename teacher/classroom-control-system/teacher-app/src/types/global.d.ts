export {};

declare global {
  interface Window {
    lan: {
      broadcastSession: (data: any) => void;
    };
  }
}
