import { IAlertItemState } from "../../recoil/alert-list.atom";

export declare namespace IAlertItem {
    interface IProps extends IAlertItemState {}
    interface IVProps extends IAlertItemState {
        checkedActivate: () => void;
    }
}
