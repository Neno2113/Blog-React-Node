import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";


import Header from "./components/Header";
import Articulos from "./components/Articulos";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Formulario from "./components/Formulario";
import Blog from "./components/Blog";
import Article from "./components/Article";
import EditFormulario from "./components/EditFormulario";
import Search from "./components/Search";
import Home from "./components/Home";



class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Header></Header>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path="/home" component={Home}></Route>
                    <Route exact path="/formulario" component={Formulario}></Route>
                    <Route exact path="/blog" component={Blog}></Route>
                    <Route exact path="/article/:article" component={Article}></Route>
                    <Route exact path="/article/editar/:id" component={EditFormulario}></Route>
                    <Route exact path="/blog/busqueda/:search" component={Search}></Route>
                    <Route exact path="/redirect/:search" render={
                        (props) => {
                            var search = props.match.params.search;
                            return (
                                <Redirect to={'/blog/busqueda/'+search}></Redirect>
                            );
                        }
                    }></Route>
                    <Route component={Error}></Route>
                </Switch>
             
                <Footer></Footer>
            
            </BrowserRouter>
        )
    }
}


export default Router;