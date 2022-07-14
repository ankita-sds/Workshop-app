import { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import ThemeContext from '../context/ThemeContext';

const Menu = ( /*{ theme, setTheme }*/ ) => {
    const { theme, setTheme } = useContext( ThemeContext );

    return (
        <Navbar bg={theme} variant={theme}>
            <Container>
                <Navbar.Brand
                    as={Link}
                    to="/"
                >
                    Home
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link
                        as={Link}
                        to="/workshops"
                    >
                        List of workshops
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/feedback"
                    >
                        Feedback
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Button
                        variant={theme === 'dark' ? 'light' : 'dark'}
                        onClick={() => setTheme( theme === 'dark' ? 'light' : 'dark' )}
                    >
                        Toggle theme
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Menu;