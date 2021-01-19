import React from 'react';
import NewDocente from './components/NewDocente';
import Global from "./../providers/urlGlobal";
import Docente from "./../modelo/Docente";
import apiDocente from "../providers/docenteApi";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import "../styles/docentes-panel.css";

class DocentesPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            img: false,
            imageSrc: '',
            archivoExtension: true,
            foto: '',
            archivo: '',
            form: {
                nombres: '',
                email: '',
                formacion_academica: '',
                experiencia_laboral: '',
            },
            loadingShow: false,
            errorShow: false,
            docentes: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.seleccionarImagen1 = this.seleccionarImagen1.bind(this);
    }

    limpiar = () => {
        this.setState({
            img: false,
            imageSrc: '',
            archivoExtension: true,
            foto: '',
            archivo: '',
            form: {
                nombres: '',
                email: '',
                formacion_academica: '',
                experiencia_laboral: '',
            }
        });
    }

    handleChange(e) {
        this.setState({
            form: {
                ... this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    seleccionarImagen1 = (e) => {
        var files = e.target.files;
        var file = files[0];
        var extension = file.name.split('.').pop();
        extension = extension.toLowerCase();
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'webp' || extension === 'svg') {
            this.setState({ img: true, archivoExtension: true });
            this.setState({ foto: Global.uuidv4() + '.' + extension })
            this.readURL1(e);
            if (files && file) {
                var reader = new FileReader();
                reader.onload = this._handleReaderLoaded1.bind(this);
                reader.readAsBinaryString(file);
            }
        } else {
            this.setState({ archivoExtension: false })
        }
    }

    _handleReaderLoaded1(readerEvent) {
        var binaryString = readerEvent.target.result;
        this.setState({ archivo: btoa(binaryString) })
    }

    readURL1(event) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = e => this.setState({ imageSrc: reader.result });
            reader.readAsDataURL(file);
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let docente = new Docente(this.state.form.nombres, this.state.form.email, this.state.form.formacion_academica, this.state.foto, this.state.form.experiencia_laboral, this.state.archivo);
        try {
            await apiDocente.docente.create(docente);
            this.limpiar();
            this.getAllDocentes();
            ToastsStore.success(<div className="mesage"> <i className="fas fa-check"></i> Docente agregado correctamente!! </div>);
        } catch (error) {
            ToastsStore.error("Ups!! ha ocurrido un problema, intenta más tarde.");
        }
    }

    getAllDocentes = async () => {
        this.setState({ loadingShow: true });
        try {
            const data = await apiDocente.docente.allshow();
            this.setState({ docentes: data, loadingShow: false, errorShow: false });
        } catch (error) {
            this.setState({ loadingShow: false, errorShow: true });
        }
    }

    componentDidMount() {
        this.getAllDocentes();
    }

    spinner = () => {
        if (this.state.loadingShow) {
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
        if (this.state.errorShow) {
            return (
                <div className="error-carga rounded">
                    Upss!!, ha ocurrido un error. Intentalo más tarde.
                </div>
            );
        } else {
            return;
        }
    }

    async eliminarDocente(id) {
        try {
            await apiDocente.docente.remove(id);
            this.getAllDocentes();
            ToastsStore.success(<div className="mesage"> <i className="fas fa-check"></i> Docente eliminado correctamente!! </div>);
        } catch (error) {
            ToastsStore.error("Ups!! ha ocurrido un problema, intenta más tarde.");
        }
    }

    render() {
        return (
            <React.Fragment>
                <NewDocente onChange={this.handleChange} uploadChange={this.seleccionarImagen1} onSubmit={this.handleSubmit} values={this.state} />
                <br />
                <ToastsContainer store={ToastsStore} />

                <div className="lista-usuarios">
                    <div className="text-center">
                        <h5>Lista de docentes</h5>
                    </div>
                    <br />
                    {this.spinner()}
                    {this.error()}
                    <div className="container">
                        {
                            this.state.docentes.map((docente) => {
                                return (
                                    <div className="row file-docente rounded border-bottom" key={docente.iddocente}>
                                        <div className="col-lg-3 ">
                                            <img className="img-docente-list" src={Global.UrlGlobal.urlArchivos + docente.foto} />
                                        </div>
                                        <div className="col-lg-9 informacion-docente">
                                            <h5>{docente.nombres}</h5>
                                            <p>{docente.formacion_academica}</p>
                                            <p>{docente.experiencia_laboral}</p>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <small>{docente.email}</small>
                                                </div>
                                                <div className="col-lg-6 text-end">
                                                    <button className="btn btn-outline-info btn-sm me-2">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="btn btn-outline-danger btn-sm" onClick={() => this.eliminarDocente(docente.iddocente)}>
                                                        <i className="far fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DocentesPanel;