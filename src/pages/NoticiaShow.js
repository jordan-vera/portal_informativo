import React from 'react';
import Navbar1 from './components/Navbar1';
import apiNoticia from '../providers/noticiaApi';
import Global from '../providers/urlGlobal';
import "../styles/NoticiaShow.css"
import { Link } from 'react-router-dom';

class NoticiaShow extends React.Component {
    state = {
        idusuario: 0,
        loading: false,
        error: false,
        noticia: {}
    }

    constructor(props, context) {
        super(props, context);
        this.state.idusuario = new URLSearchParams(this.props.location.search).get("idnoticia");
    }

    getNoticia = async () => {
        this.setState({ loading: true });
        try {
            const data = await apiNoticia.noticia.findNoticia(this.state.idusuario);
            console.log(data)
            this.setState({ loading: false, error: false, noticia: data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }

    componentDidMount() {
        this.getNoticia();
    }

    spinner = () => {
        if (this.state.loading) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    Cargando...
                </div>
            );
        } else {
            return;
        }
    }

    error = () => {
        if (this.state.error) {
            return (
                <div className="error-carga rounded">
                    Upss!!, ha ocurrido un error. Intentalo más tarde.
                </div>
            );
        } else {
            return;
        }
    }

    generarVoz(texto) {
        let vocesDisponibles = [];
        vocesDisponibles = speechSynthesis.getVoices();

        let mensaje = new SpeechSynthesisUtterance();
        mensaje.voice = vocesDisponibles[0];
        mensaje.volume = 1;
        mensaje.rate = 0.6;
        mensaje.text = texto;
        mensaje.pitch = 1;
        // ¡Parla!
        speechSynthesis.speak(mensaje);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar1 />


                <div className="container containerNoticia-show bg-white">
                    <div className="breadcrumb-login ps-4">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to='/'>
                                        <i className="fas fa-home"></i> Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Noticia</li>
                            </ol>
                        </nav>
                    </div>
                    {this.spinner()}
                    {this.error()}
                    <div className="contenedor-image ">
                        <img src={Global.UrlGlobal.urlArchivos + this.state.noticia.portada_url} className="image-noticia-show" />


                    </div>



                    <div className="row justify-content-center">
                        <div className="col-lg-9 descripcion border-top">
                            <h4 className="mt-5">{this.state.noticia.titulo}</h4>
                            <p className="texto">{this.state.noticia.descripcion}</p>

                            <button className="btn btn-sm btn-info btn-voz" onClick={
                                () => {
                                    let texto = this.state.noticia.titulo + ' ' + this.state.noticia.descripcion
                                    this.generarVoz(texto)
                                }
                            }>
                                <i className="fas fa-volume-up"></i>
                            </button>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            </React.Fragment>
        );
    }
}

export default NoticiaShow;