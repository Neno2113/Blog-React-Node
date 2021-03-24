import React,{ Component } from "react";
import { Link, Redirect } from "react-router-dom";


class Aside extends Component {

    searchRef = React.createRef();


    state = {
        search: "",
        redirect: false
    };

    redirectToSearch = (e) => {
        e.preventDefault();

        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        });
    }

     
    render(){


        if(this.state.redirect){
            return <Redirect to={'/redirect/'+this.state.search}></Redirect>
        }



        return(
            <aside className="aside">
                {this.props.view === "true" &&
                (
                <div className="side-box">
                    <h3 className="title-aside">Puedes hacer esto</h3>
                    <Link to="/formulario" className="boton-crear">Crear articulo</Link>
                </div>
                )}
                <div className="form-box">
                    <h3 className="title-aside">Buscador</h3>
                    <form action="" className="searchForm" onSubmit={this.redirectToSearch}>
                        <h4>Encuentra el articulo que buscas</h4>
                        <input type="text" name="" id="" className="searchInput" ref={this.searchRef}/>

                        <input type="submit" className="boton-buscar" value="Buscar"/>
                    </form>
                </div>
            </aside>
        );
    }
}


export default Aside;