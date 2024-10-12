import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownToggle,
  Form,
  Image,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  NavLink,
  Row,
} from "react-bootstrap";
import styles from "./Mynavbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { setSearchedMoviesAction } from "../../redux/actions/moviesActions";
import { useState } from "react";

const Mynavbar = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const token: string = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");

  const getSearchedMoviesFetch = async (token: string, query: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setSearchedMoviesAction(data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${styles.navbar}`}>
      <Container>
        <NavbarBrand>CineTrack</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className={` ${styles.navbar__navLinks}`}>
            <NavLink>Esplora</NavLink>
            <NavLink>Film</NavLink>
            <NavLink>Serie TV</NavLink>
            <NavLink>La mia lista</NavLink>
          </Nav>
          <Form
            className="me-auto"
            onSubmit={(e) => {
              e.preventDefault();
              getSearchedMoviesFetch(token, searchQuery);
            }}
          >
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
          <Dropdown>
            <DropdownToggle
              id="dropdown-basic"
              as="span"
              className={`d-flex align-items-center ${styles.navbar__profileDropdown}`}
            >
              <Image
                src={userData.avatar}
                roundedCircle
                width={40}
                height={40}
                alt="User Profile"
                className={styles.navbar__profileImage}
              />
            </DropdownToggle>

            <Dropdown.Menu>
              <Dropdown.Item>Le mie info</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default Mynavbar;
