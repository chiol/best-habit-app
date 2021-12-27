import { Container } from "@mui/material";
import type { NextPage } from "next";
import { AlertList, FloatingButton } from "../components";
import useMessage from "../hooks/useMessage";

const Home: NextPage = () => {
    useMessage();
    return (
        <Container maxWidth="xs" sx={{ bgcolor: "#eeeeee" }}>
            <AlertList />
            <FloatingButton />
        </Container>
    );
};

export default Home;
