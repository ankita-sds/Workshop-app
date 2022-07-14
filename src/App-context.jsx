import { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Menu from "./components/Menu";
import Home from "./components/pages/Home";
import WorkshopsList from "./components/pages/WorkshopsList";
import WorkshopDetails from "./components/pages/WorkshopDetails";
import ThemeContext from './context/ThemeContext';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    // store data shared between components in the nearest common ancestor component
    const [ theme, setTheme ] = useState( 'dark' );

    const value = {
        theme,
        setTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            <ToastContainer autoClose={5000} />
            <Menu />
            <Container className="my-5">
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/workshops" exact>
                        <WorkshopsList />
                    </Route>
                    <Route path="/workshops/:id">
                        <WorkshopDetails />
                    </Route>
                    <Route path="**">
                        <div>Page not found</div>
                    </Route>
                </Switch>
            </Container>
        </ThemeContext.Provider>
    );
}

export default App;