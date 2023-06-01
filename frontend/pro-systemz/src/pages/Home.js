import { Button, Container } from "react-bootstrap";
import Header from "../components/Header";

const Home = () => {
    return(
        <>
        <Header></Header>
        <Container className="text-center mt-5">
            <Button className="button buttonPrimary">Build Your Own Computer.</Button>
        </Container>
        </>
    );
}

export default Home;