import { Stack } from "@mui/material";
import { AlertItem } from "..";
import { IAlertList } from "./AlertList.interface";

const VAlertList: React.FC<IAlertList.IVProps> = (props) => {
    return (
        <Stack width={"100%"} height={"100vh"} spacing={2} pt={2}>
            {props.items.map((item, key) => (
                <AlertItem {...item} key={key} />
            ))}
        </Stack>
    );
};

export default VAlertList;
