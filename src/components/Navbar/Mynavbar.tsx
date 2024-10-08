import {
  Container,
  Dropdown,
  DropdownToggle,
  Image,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  NavLink,
} from "react-bootstrap";
import styles from "./Mynavbar.module.scss";

const Mynavbar = () => {
  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${styles.navbar}`}>
      <Container>
        <NavbarBrand>CineTrack</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className={`mx-auto ${styles.navbar__navLinks}`}>
            <NavLink>Esplora</NavLink>
            <NavLink>Film</NavLink>
            <NavLink>Serie TV</NavLink>
            <NavLink>La mia lista</NavLink>
          </Nav>
          <Dropdown>
            <DropdownToggle
              id="dropdown-basic"
              as="span"
              className={`d-flex align-items-center ${styles.navbar__profileDropdown}`}
            >
              <Image
                src="https://via.placeholder.com/40"
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
