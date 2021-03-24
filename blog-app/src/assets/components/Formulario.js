import React, { Component } from "react";
import Global from "../Global";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import Slider from "./Slider";
import Aside from "./Aside";
import { Redirect } from "react-router-dom";

class Formulario extends Component {


    constructor(){
        super();
        this.validator = new SimpleReactValidator({
            messages: {
                required: "Este campo es requerido."
            }
        })
    }

    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();
    fileRef = React.createRef();


    state = {
        article: {},
        status: null,
        selectedFile: null
       
    }

    saveArticle = (e) => {
        e.preventDefault();

        this.changeState();

        if(this.validator.allValid()){
            axios.post(this.url+'save', this.state.article)
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
                                            'Articulo creado correctamente!',
                                            'Has creado un articulo nuevo.',
                                            'success'
                                        ) 
                                    } else {
                                        this.setState({
                                            galeria: res.data.galeria,
                                            status: "failed"
                                        });
                                    }
                                })
                        } else {
                            this.setState({
                                status: "success"
                            });
                            
                            //sweetalert
                            Swal.fire(
                                'Articulo creado correctamente!',
                                'Has creado un articulo nuevo.',
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
            article: {
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

        if(this.state.status === "success"){
            return <Redirect to="/home"></Redirect>
        }

        return(
            <React.Fragment>   
                <Slider title="Formulario" size="small"></Slider>     
                <section className="main-content">
                    <div className="contenido">
                        <h2 className="last-articles">Creacion de articulos</h2>
                        <form action="" className="form" onSubmit={this.saveArticle}>
                        
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />
                            {this.validator.message('title', this.state.article.title, 'required')}
                            <label htmlFor="">Contenido</label>
                            <textarea  name="content" className="form-content"   ref={this.contentRef} onChange={this.changeState}></textarea>
                            {this.validator.message('content', this.state.article.content, 'required')}
                            <label htmlFor="">Imagen</label>
                            <input type="file" name="file0" className="imagen" onChange={this.fileChange} ref={this.fileRef}/>

                            <input type="submit" value="Crear" className="boton-crear"/>
                        </form>
                    </div>
                </section>
                <Aside></Aside>
            </React.Fragment>
        );
    }
}



export default Formulario;