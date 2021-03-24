import React, { Component } from "react";


import Aside from "./Aside";
import Slider from "./Slider"

class Error extends Component {
    render(){
        return(
            <React.Fragment>
                <Slider title="Ops..." size="small"></Slider>
                <section className="main-content">
                    <div className="contenido">
                        <h2>Pagina no encontrada</h2>
                        <p>La pagina que intentas acceder no existe en esta web</p>
                    </div>
                </section>
                <Aside view="true"></Aside>
            </React.Fragment>
        )   
    }
}


export default Error;