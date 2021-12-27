import { ButtonBase, Modal, Paper, Switch, Typography } from "@mui/material";
import dayjs from "dayjs";
import { IAlertItem } from "./AlertItem.interface";
import { useLongPress } from "use-long-press";
import AlertModification from "../AlertModification";
import { useState } from "react";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const VAlertItem: React.FC<IAlertItem.IVProps> = (props) => {
    const { endTime, startTime, msInterval, title, isActive, checkedActivate } =
        props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const bind = useLongPress(() => {
        handleOpen();
    });
    return (
        <>
            <ButtonBase {...bind}>
                <Paper elevation={1} sx={{ padding: "10px", width: "100%" }}>
                    <Typography variant="subtitle1">{title}</Typography>
                    <Typography>
                        {dayjs(startTime).format("LT")} ~{" "}
                        {dayjs(endTime).format("LT")} ({msInterval}분)
                    </Typography>
                    <Switch checked={isActive} onChange={checkedActivate} />
                </Paper>
            </ButtonBase>
            <Modal open={open} onClose={handleClose}>
                <AlertModification {...props} />
            </Modal>
        </>
    );
};

export default VAlertItem;
