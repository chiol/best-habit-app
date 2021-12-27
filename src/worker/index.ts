import dayjs from "dayjs";
import AlertManager, { IAlertItem } from "./AlertManager";

declare let self: ServiceWorkerGlobalScope;

self.__WB_DISABLE_DEV_LOGS = true;

interface IAlertCreateData {
    tag: "alert";
    command: "create";
    payload: IAlertItem;
}
interface IAlertReadData {
    tag: "alert";
    command: "read";
    payload: null;
}
interface IAlertUpdateData {
    tag: "alert";
    command: "update";
    payload: IAlertItem;
}
interface IAlertDeleteData {
    tag: "alert";
    command: "delete";
    payload: { id: number };
}
type IData =
    | IAlertCreateData
    | IAlertReadData
    | IAlertUpdateData
    | IAlertDeleteData;

self.addEventListener("message", async (event) => {
    if (!event) return;
    const { tag, command, payload } = event.data as IData;
    if (tag === "alert") {
        if (command === "create" && payload) AlertManager.add(payload);
        if (command === "read") {
            event?.waitUntil(
                self.clients.matchAll().then(function (clientList) {
                    if (clientList.length > 0) {
                        let client = clientList[0];
                        return client.postMessage(AlertManager.data);
                    }
                    return self.clients.openWindow("/");
                })
            );
        }
        if (command === "update") AlertManager.update(payload);
        if (command === "delete" && payload) AlertManager.remove(payload.id);
    }
});
self.addEventListener("sync", () => {
    if (!AlertManager.isCalled) {
        const interval = setInterval(() => {
            if (AlertManager.data.length === 0) {
                AlertManager.isCalled = false;
                clearInterval(interval);
            } else {
                AlertManager.data.forEach((v) => {
                    const start =
                        dayjs(v.startTime).hour() * 60 +
                        dayjs(v.startTime).minute();
                    const end =
                        dayjs(v.endTime).hour() * 60 +
                        dayjs(v.endTime).minute();
                    const curr = dayjs().hour() * 60 + dayjs().minute();
                    if (
                        v.isActive &&
                        isBetween(start, end, curr) &&
                        isCorrect(start, curr, v.msInterval)
                    ) {
                        self.registration.showNotification(v.title, {
                            body: v.title,
                        });
                    }
                });
            }
        }, 60 * 1000);
        AlertManager.isCalled = true;
    }
});

self.addEventListener("notificationclick", (event) => {
    event?.notification.close();
});

function isBetween(start: number, end: number, curr: number) {
    if (start > end) {
        return !(start < curr && curr < end);
    }
    if (start < end) {
        return start <= curr && curr <= end;
    }
    return start === curr && end === curr;
}
function isCorrect(start: number, curr: number, ms: number) {
    if (start > curr) {
        return (start + curr) % ms === 0;
    }
    if (start <= curr) {
        return (curr - start) % ms === 0;
    }
    return false;
}

export {};
