//import logo from './logo.svg';
import { useState } from 'react';
import { Route, Switch } from "react-router-dom"
import { Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import './App.css';
import './components/Menu';
import Home from './components/pages/Home';
import Menu from './components/Menu';
import WorkshopList from './components/pages/workshopList';
import WorkshopDetails from "./components/pages/workshopDetails";
import ThemeContext from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <Provider store={store}>
          <ToastContainer autoClose={5000} />
            <Menu /> {/* <Menu /> or <Menu></Menu> /*/}
              <Container>
                    <Switch>
                          <Route path="/" exact >
                            <Home></Home>
                          </Route>

                          <Route path="/workshops" exact>
                            <WorkshopList />
                          </Route>

                          {/*
                            EXCERCISE: include a route for /workshop/2, that shows the new component
                            Type out .../ workshop/2 in the address bar to check if the component appears  */}

                          <Route path = "/workshops/:id">
                              <WorkshopDetails />
                            </Route>

                          <Route path="**">
                            <div> page not found </div>
                            </Route>   
                    </Switch>
              </Container>
          </Provider>
    </>
  );
}

export default App;
