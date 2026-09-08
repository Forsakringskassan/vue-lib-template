export {};

declare global {
    interface Window {
        bundleMocks?: Promise<void>;
    }
}
