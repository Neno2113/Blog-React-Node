import React,{ Component } from "react";
import loading from "../assets/image/loading.jpg";
import axios from "axios";
import Global from "../Global";
import Moment from "react-moment";
import "moment/locale/es";
import Swal from "sweetalert2"
import Aside from "./Aside";
import Slider from "./Slider";
import { Link, Redirect } from "react-router-dom";


class Article extends Component {

    url = Global.url;



    state = {
        article: {},
        status: null
    }

    componentDidMount(){
        this.getArticle();
    }


    getArticle = () => {
        let id = this.props.match.params.article;


        axios.get(this.url+'article/'+id)
            .then(res => {
                // console.log(res.data.article);
                this.setState({
                    article: res.data.article,
                    status: "success"
                })
            })
            .catch(err => {
                this.setState({
                    article: false,
                    status: "success"
                });
            })
    }


    deleteArticle = (id) => {
        Swal.fire({
            title: 'Estas seguro de eliminar este articulo?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminalo!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(this.url+'delete/'+id)
                    .then(res => {
                        this.setState({
                            article: res.data.article,
                            status: "deleted"
                        })
                    })


           
            } else {
                Swal.fire(
                    'Tranquilo!',
                    'Tranquilo no se ha eliminado el articulo.',
                    'info'
                )
            }
          })
    }

   


    render(){

        if(this.state.status === 'deleted'){
            Swal.fire(
                'Articulo eliminado!',
                'El articulo ha sido eliminado.',
                'success'
            )

            return <Redirect to='/home'></Redirect>
        }

        let article = this.state.article;

        return(
            <React.Fragment>
                <Slider title="Blog" size="small"></Slider>
                {this.state.article &&
                      <section className="main-content">
                      <div className="single-blog">
                          <h2 className="title-top">Articulo</h2>
  
                          <div className="img-blog">
                              {article.image !== null ? 
                              (
                                  <img src={this.url+'get-image/'+article.image} alt={article.title}/>
                              ) : (
                                  <img src={loading} alt={article.title}/>
                              )   
                              }
                          
                          </div>
                          <div className="info-blog">
                              <h3>{article.title}</h3>
                              <p>
                                  {article.content}
                              </p>
  
                              <span className="hace">
                                  <Moment locale="es" fromNow>{article.date}</Moment>  
                              </span>
                          </div>
                          <div className="botones">
                              <Link to={'/article/editar/'+article._id} className="btn-editar">Editar</Link>
                              <button className="btn-borrar" onClick={
                                  () => {
                                      this.deleteArticle(article._id);
                                  }
                              }>Borrar</button>
                          </div>
  
                      </div>
                  </section>
                }
                {!this.state.article && this.state.status === 'success' &&
                    <section className="main-content">
                        <div className="single-blog">
                            <h2 className="title-top">Articulo</h2>
  
                            <div className="img-blog">
                                <img src={loading} alt={article.title}/>
                            </div>
                            <div className="info-blog">
                                <h3>Ooops...</h3>
                                <p>
                                    Welp! no hay nada que mostrar
                                </p>
    
                                <span className="hace">
                                    =( 
                                </span>
                            </div>
                    
                        </div>
                    </section>

                }
                {this.state.status === null &&
                    <section className="main-content">
                        <div className="single-blog">
                            <h2 className="title-top">Articulo</h2>
    
                            <div className="img-blog">
                                <img src={loading} alt={article.title}/>
                            </div>
                            <div className="info-blog">
                                <h3>Ooops...</h3>
                                <p>
                                    Welp! no hay nada que mostrar
                                </p>
    
                                <span className="hace">
                                    =( 
                                </span>
                            </div>
                    
                        </div>
                    </section>
                }
              
                <Aside view="true"></Aside>
        </React.Fragment>
        )
    }
}



export default Article;
