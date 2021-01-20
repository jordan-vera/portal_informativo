import React from 'react';
import NewNoticia from './components/NewNoticia';
import Global from "./../providers/urlGlobal";
import apiNoticia from "./../providers/noticiaApi";
import Noticia from "../modelo/Noticia";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import "../styles/noticias-panel.css";
import { Link } from 'react-router-dom';

class NoticiasPanel extends React.Component {
    state = {
        form: {
            titulo: '',
            descripcion: '',
            tipo_noticia: 'Normal',
        },
        portada_url: '',
        archivo: '',
        img: false,
        imageSrc: '',
        archivoExtension: true,
        noticias: [],
        loading: false,
        error: false,
        idusuario: 0
    };

    constructor(props, context) {
        super(props, context);
        this.state.idusuario = new URLSearchParams(this.props.location.search).get("iduser");
    }

    limpiar = () => {
        this.setState({
            img: false,
            imageSrc: '',
            archivoExtension: true,
            portada_url: '',
            archivo: '',
            form: {
                titulo: '',
                descripcion: '',
                tipo_noticia: 'Normal',
            }
        });
    }

    handleChange = (e) => {
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
            this.setState({ img: true, archivoExtension: true, portada_url: Global.uuidv4() + '.' + extension });
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

    guardarNoticia = async (e) => {
        e.preventDefault();
        let noticia = new Noticia(this.state.form.titulo, this.state.form.descripcion, this.state.portada_url, this.state.form.tipo_noticia, this.state.archivo);
        try {
            await apiNoticia.noticia.create(noticia);
            this.limpiar();
            this.getAllNoticias();
            ToastsStore.success(<div className="mesage"> <i className="fas fa-check"></i> Noticia agregado correctamente!! </div>);
        } catch (error) {
            ToastsStore.error("Ups!! ha ocurrido un problema, intenta más tarde.");
        }
    }

    getAllNoticias = async () => {
        this.setState({ loading: true });
        try {
            const data = await apiNoticia.noticia.allshow();
            this.setState({ loading: false, error: false, noticias: data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }

    componentDidMount() {
        this.getAllNoticias();
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

    async eliminarNoticia(idnoticia) {
        try {
            await apiNoticia.noticia.remove(idnoticia);
            this.getAllNoticias();
            ToastsStore.success(<div className="mesage"> <i className="fas fa-check"></i> Noticia eliminada correctamente!! </div>);
        } catch (error) {
            ToastsStore.error("Ups!! ha ocurrido un problema, intenta más tarde.");
        }
    }

    render() {
        return (
            <React.Fragment>
                <NewNoticia values={this.state} onChange={this.handleChange} uploadChange={this.seleccionarImagen1} onSubmit={this.guardarNoticia} />
                <br />
                <ToastsContainer store={ToastsStore} />

                <div>
                    <div className="text-center">
                        <h5>Lista de noticias</h5>
                    </div>
                    <br />
                    {this.spinner()}
                    {this.error()}

                    <div className="container">
                        {
                            this.state.noticias.map((noticia) => {
                                return (
                                    <div className="row border-bottom pb-2 mb-4" key={noticia.idnoticia}>
                                        <div className="col-lg-3">
                                            <img src={Global.UrlGlobal.urlArchivos + noticia.portada_url} className="image-noticia" />
                                        </div>
                                        <div className="col-lg-9">
                                            <h5>{noticia.titulo} - {noticia.tipo_noticia}</h5>
                                            <p>{noticia.descripcion}</p>
                                            <div className="text-end">
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => this.eliminarNoticia(noticia.idnoticia)}>
                                                    <i className="far fa-trash-alt"></i>
                                                </button>
                                                <Link to={'/edit-noticia?iduser=' + this.state.idusuario + "&idnoticia="+ noticia.idnoticia} className="btn btn-outline-info btn-sm ms-3">
                                                    <i className="far fa-edit"></i>
                                                </Link>
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

export default NoticiasPanel;