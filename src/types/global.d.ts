interface SyncManager {
    getTags(): Promise<string[]>;
    register(tag: string): Promise<void>;
}

export declare global {
    interface ServiceWorkerRegistration {
        readonly sync: SyncManager;
    }

    interface SyncEvent extends ExtendableEvent {
        readonly lastChance: boolean;
        readonly tag: string;
    }

    interface ServiceWorkerGlobalScopeEventMap {
        sync: SyncEvent;
    }
    type PermissionName =
        | "geolocation"
        | "notifications"
        | "persistent-storage"
        | "push"
        | "screen-wake-lock"
        | "xr-spatial-tracking";
}
