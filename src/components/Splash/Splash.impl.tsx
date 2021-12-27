import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { WorkerService } from "../../services";
import { ISplash } from "./Splash.interface";

const Splash: React.FC<ISplash.IProps> = ({ children }) => {
    const [init, setInit] = useState(false);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!WorkerService.isReady) return;
            clearInterval(intervalId);
            setInit(WorkerService.isReady);
        }, 100);
    }, []);
    return <div>{init ? children : Splash}</div>;
};

export default Splash;
