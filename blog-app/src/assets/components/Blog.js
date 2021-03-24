import React,{ Component } from "react";

import Slider from "./Slider";
import Aside from "./Aside";
import Articulos from "./Articulos";

class Home extends Component {
    render(){
        return(
            <React.Fragment>
            <Slider title="Blog" size="small" ></Slider>
            <section className="main-content">
                <div className="contenido">
                <h2 className="last-articles">Articulos</h2>
                    <Articulos></Articulos>
                </div>
               
               </section>
          
               <Aside view="true"></Aside>
           </React.Fragment>
        )
    }
}


export default Home;