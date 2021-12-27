import { useRecoilValue } from "recoil";
import { alertListAtom } from "../../recoil/alert-list.atom";
import { IAlertList } from "./AlertList.interface";
import VAlertList from "./AlertList.view";

const AlertList: React.FC<IAlertList.IProps> = () => {
    const items = useRecoilValue(alertListAtom);
    return <VAlertList items={items} />;
};

export default AlertList;
