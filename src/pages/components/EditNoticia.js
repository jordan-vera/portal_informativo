import React from 'react';
import Global from "../../providers/urlGlobal";
import apiNoticia from "../../providers/noticiaApi";
import Noticia from "../../modelo/Noticia";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { Link } from 'react-router-dom';

class EditNoticia extends React.Component {
    state = {
        idusuario: 0,
        idnoticia: 0,
        img: false,
        imageSrc: '',
        archivoExtension: true,
        portada_url: '',
        archivo: '',
        form: {
            titulo: '',
            descripcion: '',
            tipo_noticia: 'Normal',
        },
        anterior: ''
    }

    constructor(props, context) {
        super(props, context);
        this.state.idusuario = new URLSearchParams(this.props.location.search).get("iduser");
        this.state.idnoticia = new URLSearchParams(this.props.location.search).get("idnoticia");
    }

    seleccionarImagen1 = (e) => {
        var files = e.target.files;
        var file = files[0];
        var extension = file.name.split('.').pop();
        extension = extension.toLowerCase();
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'webp' || extension === 'svg') {
            this.setState({ img: true, archivoExtension: true });
            this.state.portada_url = Global.uuidv4() + '.' + extension;
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
            reader.onload = e => this.setState({ imageSrc: reader.result, archivo: reader.result });
            reader.readAsDataURL(file);
        }
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ... this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    imagenUpload = () => {
        if (!this.state.img) {
            return <img src={Global.UrlGlobal.urlArchivos + this.state.portada_url} />
        } else {
            return <img src={this.state.imageSrc} />
        }
    }

    getNoticia = async () => {
        try {
            const data = await apiNoticia.noticia.findNoticia(this.state.idnoticia);
            this.setState({ form: { titulo: data.titulo, descripcion: data.descripcion, tipo_noticia: data.tipo_noticia }, portada_url: data.portada_url, anterior: data.portada_url })
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getNoticia();
    }

    actualizarNoticia = async (e) => {
        e.preventDefault();
        try {
            let noticia = new Noticia(this.state.form.titulo, this.state.form.descripcion, this.state.portada_url, this.state.form.tipo_noticia, this.state.archivo)
            await apiNoticia.noticia.updates(this.state.idnoticia, noticia, this.state.anterior);
            ToastsStore.success(<div className="mesage"> <i className="fas fa-check"></i> Noticia actualizada correctamente!! </div>);
        } catch (error) {
            ToastsStore.error("Ups!! ha ocurrido un problema, intenta más tarde.");
        }
    }

    render() {
        return (
            <React.Fragment>
                <ToastsContainer store={ToastsStore} />
                <Link to={"/noticias?iduser=" + this.state.idusuario} className="mb-4">
                    <i className="fas fa-arrow-left"></i> Atrás
                </Link>

                <h5 className="mb-5 mt-4"><i className="far fa-edit"></i> Actualizar Noticia</h5>

                <form onSubmit={this.actualizarNoticia}>
                    <div className="row">
                        <div className="col-lg-3">
                            <small>Portada de noticia:</small>
                            <label htmlFor="file-upload-imagen4" className="subir-image">
                                <div className="imagen-upload">
                                    {this.imagenUpload()}
                                </div>
                            </label>
                            <input id="file-upload-imagen4" className="upload" type="file" accept="image/*"
                                onChange={this.seleccionarImagen1} />
                        </div>

                        <div className="col-lg-9">

                            <label>Título</label>
                            <input onChange={this.handleChange} className="form-control" type="text" name="titulo" value={this.state.form.titulo} required />

                            <label className="lbl">Descripción</label>
                            <textarea onChange={this.handleChange} className="form-control" name="descripcion" value={this.state.form.descripcion} required ></textarea>

                            <br />
                            <div className="row">
                                <div className="col-lg-6">
                                    <label>Tipo de noticia</label>
                                    <select className="form-select" onChange={this.handleChange} name="tipo_noticia" value={this.state.form.tipo_noticia} required>
                                        <option defaultValue="Normal">Normal</option>
                                        <option defaultValue="Destacado">Destacado</option>
                                    </select>
                                </div>
                            </div>

                            <div className="cont-btn">
                                <button className="btn btn-secondary">
                                    <i className="far fa-edit"></i> Actualizar Noticia
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default EditNoticia;