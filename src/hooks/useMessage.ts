import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { alertListAtom } from "../recoil/alert-list.atom";

function useMessage() {
    const setAlertList = useSetRecoilState(alertListAtom);
    const init = async () => {
        const state = await Notification.requestPermission();
        if (state !== "granted") {
            alert("알림 권한이 필요합니다.");
        }
        const reg = await navigator.serviceWorker.ready;
        if (!reg.active) return;
        reg.active.postMessage({
            tag: "alert",
            command: "read",
        });
        reg.sync.register("wakeup");
    };
    navigator.serviceWorker.onmessage = (e) => {
        setAlertList(e.data);
    };
    useEffect(() => {
        Notification;
        setInterval(() => {
            init();
        }, 1000);
    }, []);
}

export default useMessage;
