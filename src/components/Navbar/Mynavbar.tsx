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
import { AppDispatch, RootState } from "../../redux/store/store";
import { setSearchedMoviesAction } from "../../redux/actions/moviesActions";
import { useEffect, useState } from "react";
import { setSearchedSeriesAction } from "../../redux/actions/seriesActions";
import {
  getMoviesInListFetch,
  getSeriesInListFetch,
  getUserDataFetch,
  saveUserDataAction,
} from "../../redux/actions/userActions";
import { Link } from "react-router-dom";

const Mynavbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.user);
  const [error, setError] = useState("");
  const token: string = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");

  /*  const getUserDataFetch = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData: UserDataResponse = await response.json();
        //INSERIRE DISPATCH PER AGGIORNARE I DATI UTENTE NELLO STORE
        dispatch(saveUserDataAction(userData));
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "errore nel recuperare i dati dell'utente");
      }
    } catch (error) {
      console.log(error);
    }
  }; */

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

  const getSearchedSeriesFetch = async (token: string, query: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/series/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setSearchedSeriesAction(data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getUserDataFetch(token));
    dispatch(getMoviesInListFetch(token));
    dispatch(getSeriesInListFetch(token));
  }, []);

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${styles.navbar}`}>
      <Container>
        <NavbarBrand as={Link} to={"/"}>
          CineTrack
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className={` ${styles.navbar__navLinks}`}>
            <NavLink as={Link} to={"/"}>
              Esplora
            </NavLink>
            <NavLink>Film</NavLink>
            <NavLink>Serie TV</NavLink>
            <NavLink as={Link} to={"/my-lists"}>
              La mia lista
            </NavLink>
          </Nav>
          <Form
            className="me-auto"
            onSubmit={(e) => {
              e.preventDefault();
              getSearchedMoviesFetch(token, searchQuery);
              getSearchedSeriesFetch(token, searchQuery);
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
