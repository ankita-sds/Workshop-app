import './Menu.css'
import {Nav, Navbar, Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { setTheme, toggleTheme } from '../Actions/creators';

import "./Menu.css";

const Menu = ( ) =>{

    const theme = useSelector( state => state.value );
    const dispatch = useDispatch();

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
                        onClick={() => dispatch( toggleTheme() )}                    >
                        Toggle theme
                    </Button>
                </Nav>
            </Container>
        </Navbar>

    );
};

export default Menu;