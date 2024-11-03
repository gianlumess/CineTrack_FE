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
import { getMoviesInListFetch, getSeriesInListFetch, getUserDataFetch } from "../../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const Mynavbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user.user);
  const token: string | null = localStorage.getItem("token");
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

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  useEffect(() => {
    if (token !== null) {
      dispatch(getUserDataFetch(token));
      dispatch(getMoviesInListFetch(token));
      dispatch(getSeriesInListFetch(token));
    }
  }, [token, dispatch]);

  return (
    <Navbar expand="lg" className={`bg-dark text-light  ${styles.navbar}`}>
      <Container>
        <NavbarBrand className="text-accent me-5" as={Link} to={"/"}>
          CineTrack
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className={` ${styles.navbar__navLinks}`}>
            <NavLink className="text-light" as={Link} to={"/"}>
              Esplora
            </NavLink>
            <Dropdown className="d-flex align-items-center">
              <DropdownToggle as="span" className="text-light">
                Film
              </DropdownToggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={"/trending-movies"}>
                  Di tendenza
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={"/top-rated-movies"}>
                  Più votati
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="d-flex align-items-center">
              <DropdownToggle as="span" className="text-light">
                Serie TV
              </DropdownToggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={"/trending-series"}>
                  Di tendenza
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={"/top-rated-series"}>
                  Più votate
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <NavLink className="text-light me-5" as={Link} to={"/my-lists"}>
              La mia lista
            </NavLink>
          </Nav>
          <Form
            className="me-auto"
            onSubmit={(e) => {
              e.preventDefault();
              getSearchedMoviesFetch(token ?? "", searchQuery);
              getSearchedSeriesFetch(token ?? "", searchQuery);
              navigate("/search");
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
                <Button className={styles.navbar__submitButton} type="submit">
                  Cerca
                </Button>
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
              <Dropdown.Item as={Link} to={"/my-profile"}>
                Le mie info
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default Mynavbar;
