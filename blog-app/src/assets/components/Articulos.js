import React, { Component } from "react";
import loading from "../assets/image/loading.jpg";
import axios from "axios";
import Global from "../Global";
import Moment from "react-moment";
import "moment/locale/es";

import { Link } from "react-router-dom";

class Articulos extends Component {

    url = Global.url;

    state = {
        articles: [],
        status: null,
        paginator: []
    }

    componentDidMount(){
        var search = this.props.search;

        if(search && search != null && search !== undefined){
            this.getSearch(search)
        } else {
            this.getArticles();
        }
        
    }


    getSearch = (search) => {
        axios.get(this.url+'search/'+search)
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: "success",
                });
            })
    }


    getArticles = (page) => {
        if(page){
            axios.get(this.url+'article?page='+page)
            .then(res => {
                this.setState({
                    articles: res.data.article.docs,
                    status: "success",
                    paginator: res.data.article
                })
                // console.log(this.state);
            });
        } else {
            axios.get(this.url+'article?page=1')
            .then(res => {
                this.setState({
                    articles: res.data.article.docs,
                    status: "success",
                    paginator: res.data.article
                })
                // console.log(this.state);
            });
        }
   
    }

    seleccionPage = (page) => {
        this.getArticles(page);
    }

    nextPage = (page) => {
        this.getArticles(page)
    }

    previousPage = (page) => {
        this.getArticles(page)
    }


    render(){
        var listArticle = this.state.articles.map((article) => {
            return(
                <article key={article._id}>
                    <div className="img-wrap">
                        {article.image !== null ? (
                            <img src={this.url+'get-image/'+article.image} alt={article.image}/>
                        ): (
                            <img src={loading} alt=""/>
                        )

                        }
                      
                    </div>
                    <div className="info">
                        <h3>{article.title}</h3>
                        <span className="hace">
                            <Moment locale="es" fromNow>{article.date}</Moment>  
                        </span>
                       <Link to={'/article/'+ article._id}>Leer mas</Link>
                    </div>
                </article>
            )
        })

        const paginas = [];
        for (let index = 1; index <= this.state.paginator.totalPages; index++) {
            paginas.push(<li key={index} className="page-item"><button className="page-link" onClick={
                () =>{
                    this.seleccionPage(index)
                }
            }>{index}</button></li>)
            
        }





        return(
            <React.Fragment>
              
                {listArticle}
                <nav aria-label="Page navigation " className="paginacion">
                    <ul className="pagination">
                        {this.state.paginator.hasPrevPage !== false ? (
                            <li className="page-item">
                            <button className="page-link"  aria-label="Previous" onClick ={
                                () => {
                                    this.previousPage(this.state.paginator.prevPage)
                                }
                            }>
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                            </li>
                        ) : (
                            <li className="page-item disabled">
                            <button className="page-link"  aria-label="Previous" onClick ={
                                () => {
                                    this.previousPage(this.state.paginator.prevPage)
                                }
                            }>
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                            </li>
                        )

                        }
                    
                        {paginas}
                        {this.state.paginator.hasNextPage !== false ? (
                            <li className="page-item">
                            <button className="page-link"  aria-label="Next" onClick={
                                () => {
                                    this.nextPage(this.state.paginator.nextPage);
                                }
                            }>
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                            </li>
                        ) : (
                            <li className="page-item disabled">
                            <button className="page-link"  aria-label="Next" onClick={
                                () => {
                                    this.nextPage(this.state.paginator.nextPage);
                                }
                            }>
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                            </li>
                        )

                        }
                    
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}


export default Articulos;