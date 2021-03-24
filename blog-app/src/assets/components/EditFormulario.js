import React,{ Component } from "react";
import axios from "axios";
import Global from "../Global";
import loading from "../assets/image/loading.jpg";
import Swal from "sweetalert2";
import Slider from "./Slider";
import Aside from "./Aside";
import SimpleReactValidator from "simple-react-validator";
import { Redirect } from "react-router-dom";

class EditFormulario extends Component {


    constructor(){
        super();
        this.validator = new SimpleReactValidator({
            messages: {
                required: "Este campo es obligatorio."
            }
        });
    }

    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();
    fileRef = React.createRef();
    article_id = null;

    state = {
        article: {},
        articleUpdated: {},
        status: null,
        selectedFile: null
    }

    componentDidMount(){
        this.article_id = this.props.match.params.id;
        this.getArticle(this.article_id);
   
    }


    getArticle = (id) => {
        axios.get(this.url+'article/'+id)
            .then(res => {
                // console.log(res.data.article);
                this.setState({
                    article: res.data.article,
                   
                })
            })
    }

    
    saveArticle = (e) => {
        e.preventDefault();

        this.changeState();
        // console.log(this.state);

        if(this.validator.allValid()){
            axios.put(this.url+'update/' + this.article_id, this.state.articleUpdated)
                .then(res => {
                    if(res.data.article){
                        this.setState({
                            article: res.data.article,
                            status: "waiting"
                        });
                    

                        if(this.state.selectedFile !== null){
                            let articleId = this.state.article._id;


                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            axios.post(this.url+'upload-image/'+articleId, formData)
                                .then(res => {
                                    if(res.data.article){
                                        this.setState({
                                            article: res.data.article,
                                            status: "success"
                                        })


                                        //sweetalert
                                        Swal.fire(
                                            'Articulo actualizado correctamente!',
                                            'Has actualizado un articulo.',
                                            'success'
                                        ) 
                                    } else {
                                        this.setState({
                                            galeria: res.data.galeria,
                                            status: "success"
                                        });
                                    }
                                })
                        } else {
                            this.setState({
                                status: "success"
                            });
                            console.log(this.state);
                            //sweetalert
                            Swal.fire(
                                'Articulo actualizado correctamente!',
                                'Has actualizado un articulo.',
                                'success'
                            ) 
                        }
                    } else {
                        this.setState({
                            status: 'failed'
                        });
                    }
                })
        } else {
            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();  
        }
      
    }

    changeState = () => {
        this.setState({
            articleUpdated: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        })
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }


    render(){
        if(this.state.status === 'success'){
           return <Redirect to="/home"></Redirect>
        }

        return(

            <React.Fragment>   
            <Slider title="Edicion" size="small"></Slider>     
            <section className="main-content">
                <div className="contenido">
                    <h2 className="last-articles">Editando articulos</h2>
                    <form action="" className="form" onSubmit={this.saveArticle}>
                    
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="title" defaultValue={this.state.article.title} ref={this.titleRef}  onChange={this.changeState}  />
                        {this.validator.message('title', this.state.articleUpdated.title, 'required')}
                        <label htmlFor="">Contenido</label>
                        <textarea  name="content" className="form-content"   defaultValue={this.state.article.content} ref={this.contentRef} onChange={this.changeState}></textarea>
                        {this.validator.message('content', this.state.articleUpdated.content, 'required')}
                        <label htmlFor="">Imagen</label>
                        <div className="img-edit">
                            {this.state.article.image !== null ? (
                                <img src={this.url+'get-image/'+ this.state.article.image} alt={this.state.article.title} className="thumb"/>
                            ) : (
                                <img src={loading} alt={this.state.article.title}  className="thumb"/>
                            )

                            }
                       
                        </div>

                        <input type="file" name="file0" className="imagen" ref={this.fileRef} onChange={this.fileChange} />

                        <input type="submit" value="Actualizar" className="boton-crear"/>
                    </form>
                </div>
            </section>
            <Aside></Aside>
        </React.Fragment>
        )
    }

}

export default EditFormulario;