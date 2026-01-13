export {};

declare global {
  interface Window {
    lan: {
      broadcastSession: (data: any) => void;
      listenForStudents: (cb: any) => void;
      endSession: () => void;
    };
  }
}
