import { css } from "@emotion/react";
import { Fab, Modal } from "@mui/material";
import { IFloatingButton } from "./FloatingButton.interface";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import InputModalContents from "../InputModalContents";

const FloatingButton: React.FC<IFloatingButton.IProps> = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleOpen}
                css={containerStyle}
            >
                <AddIcon />
            </Fab>
            <Modal open={open} onClose={handleClose}>
                <InputModalContents />
            </Modal>
        </>
    );
};

const containerStyle = css`
    position: fixed;
    right: 10px;
    bottom: 10px;
`;

export default FloatingButton;
