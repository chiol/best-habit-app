import { Paper, Switch, Typography } from "@mui/material";
import dayjs from "dayjs";
import { IAlertItem } from "./AlertItem.interface";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const VAlertItem: React.FC<IAlertItem.IVProps> = (props) => {
    const { endTime, startTime, msInterval, title, isActive, checkedActivate } =
        props;

    return (
        <Paper elevation={1} sx={{ padding: "10px" }}>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography>
                {dayjs(startTime).format("LT")} ~ {dayjs(endTime).format("LT")}{" "}
                ({msInterval}분)
            </Typography>
            <Switch checked={isActive} onChange={checkedActivate} />
        </Paper>
    );
};

export default VAlertItem;
