import React, { Component } from "react";
import { Link } from "react-router-dom";


class Slider extends Component {
    render(){
        return(
            <div className="slider" id={this.props.size}>
                <h1>{this.props.title}</h1>
                {this.props.btn &&
                    <Link to="/blog" className="boton-blog">{this.props.btn}</Link>
                }
                
            </div>
        );
    }
}

export default Slider;