export interface IAlertItem {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    msInterval: number;
    isActive: boolean;
}

class AlertManager {
    private _data: Array<IAlertItem> = [];
    private _isCalled: boolean = false;
    private static instance: AlertManager;
    public static get Instance(): AlertManager {
        return this.instance || (this.instance = new this());
    }

    public get data(): Array<IAlertItem> {
        return this._data;
    }

    public set isCalled(v: boolean) {
        this._isCalled = v;
    }

    public get isCalled(): boolean {
        return this._isCalled;
    }

    public add(v: IAlertItem) {
        this._data = [...this._data, v];
    }

    public update(v: IAlertItem) {
        const idx = this._data.findIndex(({ id }) => v.id === id);
        this._data[idx] = v;
    }

    public remove(targetId: number) {
        this._data = this._data.filter(({ id }) => id !== targetId);
    }
}

export default AlertManager.Instance;
