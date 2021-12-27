import { Box, Button, TextField } from "@mui/material";
import { IInputModalContents } from "./InputModalContents.interface";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { LocalizationProvider, MobileTimePicker } from "@mui/lab";
import { MouseEvent, useState } from "react";

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
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
const InputModalContents: React.FC<IInputModalContents.IProps> = () => {
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    const [msInterval, setMsInterval] = useState(10);
    const onSubmit = async (e: MouseEvent) => {
        e.preventDefault();
        if (!endTime || !startTime) return;
        const item = {
            id: getRandomInt(1, 10),
            title,
            startTime: startTime,
            endTime: endTime,
            msInterval,
            isActive: true,
        };
        const reg = await navigator.serviceWorker.ready;
        if (!reg.active) return;

        reg.active.postMessage({
            tag: "alert",
            command: "create",
            payload: item,
        });
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

export default InputModalContents;
