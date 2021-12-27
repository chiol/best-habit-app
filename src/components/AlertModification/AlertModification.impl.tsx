import { Box, Button, TextField } from "@mui/material";
import { IAlertModification } from "./AlertModification.interface";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { LocalizationProvider, MobileTimePicker } from "@mui/lab";
import { MouseEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { alertListAtom } from "../../recoil/alert-list.atom";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "480px",
    width: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const AlertModification: React.FC<IAlertModification.IProps> = (props) => {
    const [title, setTitle] = useState(props.title);
    const [startTime, setStartTime] = useState<string>(props.startTime);
    const [endTime, setEndTime] = useState<string>(props.endTime);
    const [msInterval, setMsInterval] = useState(props.msInterval);
    const [alertList, setAlertList] = useRecoilState(alertListAtom);
    const onSubmit = async (e: MouseEvent) => {
        e.preventDefault();
        const reg = await navigator.serviceWorker.ready;
        if (!reg.active) return;
        const index = alertList.findIndex(({ id }) => id === props.id);
        let items = [...alertList];
        let item = {
            title,
            startTime,
            endTime,
            msInterval,
            isActive: true,
            id: props.id,
        };
        items[index] = item;

        reg.active.postMessage({
            tag: "alert",
            command: "update",
            payload: item,
        });
        console.log(items);

        setAlertList(items);
    };
    return (
        <Box sx={style}>
            <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
            />
            <LocalizationProvider dateAdapter={DateAdapter}>
                <MobileTimePicker
                    label="start time"
                    value={startTime}
                    orientation="portrait"
                    views={["hours", "minutes"]}
                    openTo="hours"
                    onChange={(newValue) =>
                        newValue && setStartTime(newValue.toString())
                    }
                    renderInput={(params) => (
                        <TextField {...params} margin="normal" fullWidth />
                    )}
                />
                <MobileTimePicker
                    label="end time"
                    value={endTime}
                    views={["hours", "minutes"]}
                    openTo="hours"
                    onChange={(newValue) =>
                        newValue && setEndTime(newValue.toString())
                    }
                    renderInput={(params) => (
                        <TextField {...params} margin="normal" fullWidth />
                    )}
                />
            </LocalizationProvider>
            <TextField
                id="outlined-basic"
                label="Interval Minutes"
                variant="outlined"
                type="number"
                margin="normal"
                value={msInterval}
                onChange={(v) => setMsInterval(+v.target.value)}
                inputProps={{ inputMode: "numeric" }}
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
            />
            <Button onClick={onSubmit}>확인</Button>
        </Box>
    );
};

export default AlertModification;
