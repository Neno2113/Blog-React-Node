import React, { Component } from "react";

import Aside from "./Aside";
import Slider from "./Slider";
import Articulos from "./Articulos";


class Search extends Component {

    state = {
        articles: {},
        status: null
    }

    render(){
        let searched = this.props.match.params.search;

        return(
            <React.Fragment>
            <Slider title={"Search: "+searched} size="small" ></Slider>
            <section className="main-content">
                <div className="contenido">
                <h2 className="last-articles">Resultados</h2>
                    <Articulos search={searched}></Articulos>
                </div>
               
               </section>
          
               <Aside view="true"></Aside>
           </React.Fragment>
        )
    }
}


export default Search;