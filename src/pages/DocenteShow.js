import React from 'react';
import Navbar1 from './components/Navbar1';
import apiDocente from '../providers/docenteApi';
import Global from '../providers/urlGlobal';
import { Link } from 'react-router-dom';

class DocenteShow extends React.Component {
    state = {
        iddocente: 0,
        loading: false,
        error: false,
        docente: {}
    }
    constructor(props, context) {
        super(props, context);
        this.state.iddocente = new URLSearchParams(this.props.location.search).get("iddocente");
    }
    getDocente = async () => {
        this.setState({ loading: true });
        try {
            const data = await apiDocente.docente.findDocente(this.state.iddocente);
            this.setState({ loading: false, error: false, docente: data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }

    componentDidMount() {
        this.getDocente();
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

                <div className="container">
                    <div className="breadcrumb-login ps-4">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to='/'>
                                        <i className="fas fa-home"></i> Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Docente</li>
                            </ol>
                        </nav>
                    </div>
                    {this.spinner()}
                    {this.error()}

                    <div className="row mt-4">
                        <div className="col-lg-5 descripcion">
                            <div className="contenedor-image ">
                                <img src={Global.UrlGlobal.urlArchivos + this.state.docente.foto} className="image-docente-show" />
                            </div>
                        </div>
                        <div className="col-lg-7 descripcion">
                            <h4>{this.state.docente.nombres}</h4>
                            <p>{this.state.docente.email}</p>
                            <b>Formación académica</b>
                            <p>{this.state.docente.formacion_academica}</p>
                            <b>Cargos</b>
                            <p>{this.state.docente.experiencia_laboral}</p>
                            <button className="btn btn-sm btn-info btn-voz" onClick={
                                () => {
                                    let texto = 'Docente ' + this.state.docente.nombres + 'Formación académica ' + this.state.docente.formacion_academica + ' Cargos ' + this.state.docente.experiencia_laboral;
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

export default DocenteShow;