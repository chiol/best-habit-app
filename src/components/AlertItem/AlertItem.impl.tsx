import { useRecoilState, useSetRecoilState } from "recoil";
import { alertListAtom } from "../../recoil/alert-list.atom";
import { IAlertItem } from "./AlertItem.interface";
import VAlertItem from "./AlertItem.view";

const AlertItem: React.FC<IAlertItem.IProps> = (props) => {
    const [alertList, setAlertList] = useRecoilState(alertListAtom);
    const checkedActivate = async () => {
        const reg = await navigator.serviceWorker.ready;
        if (!reg.active) return;
        const index = alertList.findIndex(({ id }) => id === props.id);
        let items = [...alertList];
        let item = { ...items[index] };
        item.isActive = !item.isActive;
        items[index] = item;

        reg.active.postMessage({
            tag: "alert",
            command: "update",
            payload: item,
        });
        setAlertList(items);
    };
    return <VAlertItem {...props} checkedActivate={checkedActivate} />;
};

export default AlertItem;
