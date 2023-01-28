import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";
import { Nav } from "react-bootstrap";

export default function Navs() {
  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <Link to="/">FeedUs</Link>
        </Navbar.Brand>
        {state.data && (
          <Nav.Link>
            <NavLink onClick={handleLogout} to={""}>
              Logout
            </NavLink>
          </Nav.Link>
        )}
      </Container>
    </Navbar>
  );
}
