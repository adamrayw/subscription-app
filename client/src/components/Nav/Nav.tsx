import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Navs() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <Link to="/">FeedUs</Link>
        </Navbar.Brand>
        {/* <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav> */}
      </Container>
    </Navbar>
  );
}
