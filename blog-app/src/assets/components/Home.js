import React,{ Component } from "react";

import Slider from "./Slider";
import Aside from "./Aside";
import Articulos from "./Articulos";

class Home extends Component {
    render(){
        return(
            <React.Fragment>
            <Slider title="Bienvenido al Blog hecho con React" size="big" btn="Ir al blog"></Slider>
            <section className="main-content">
                <div className="contenido">
                <h2 className="last-articles">Ultimos Articulos</h2>
                    <Articulos></Articulos>
                </div>
               
               </section>
          
               <Aside view="true"></Aside>
           </React.Fragment>
        )
    }
}


export default Home;