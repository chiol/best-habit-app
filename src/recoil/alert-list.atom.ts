import { atom } from "recoil";
export interface IAlertItemState {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    msInterval: number;
    isActive: boolean;
}
export const alertListAtom = atom<IAlertItemState[]>({
    key: "alertListState",
    default: [],
});
