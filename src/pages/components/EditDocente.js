import React from 'react';
import { Link } from 'react-router-dom';
import apiDocente from '../../providers/docenteApi';
import Global from "../../providers/urlGlobal";
import Docente from "../../modelo/Docente";
import { ToastsContainer, ToastsStore } from 'react-toasts';

class EditDocente extends React.Component {
    state = {
        idusuario: 0,
        iddocente: 0,
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
        anterior: ''
    };

    constructor(props, context) {
        super(props, context);
        this.state.idusuario = new URLSearchParams(this.props.location.search).get("iduser");
        this.state.iddocente = new URLSearchParams(this.props.location.search).get("iddocente");
    }

    getDocente = async () => {
        try {
            const data = await apiDocente.docente.findDocente(this.state.iddocente);
            this.setState({ foto: data.foto, anterior: data.foto, form: { nombres: data.nombres, email: data.email, formacion_academica: data.formacion_academica, experiencia_laboral: data.experiencia_laboral } })
        } catch (error) {
            console.log(error);
        }
    }

    imagenUpload = () => {
        if (!this.state.img) {
            return <img src={Global.UrlGlobal.urlArchivos + this.state.foto} />
        } else {
            return <img src={this.state.imageSrc} />
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

    seleccionarImagen1 = (e) => {
        var files = e.target.files;
        var file = files[0];
        var extension = file.name.split('.').pop();
        extension = extension.toLowerCase();
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'webp' || extension === 'svg') {
            this.setState({ img: true, archivoExtension: true });
            this.state.foto = Global.uuidv4() + '.' + extension;
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

    componentDidMount() {
        this.getDocente();
    }

    actualizarDocente = async (e) => {
        e.preventDefault();
        try {
            let docente = new Docente(this.state.form.nombres, this.state.form.email, this.state.form.formacion_academica, this.state.foto, this.state.form.experiencia_laboral, this.state.archivo);
            await apiDocente.docente.updates(this.state.iddocente, docente, this.state.anterior);
            ToastsStore.success(<div className="mesage"> <i className="fas fa-check"></i> Noticia actualizada correctamente!! </div>);
        } catch (error) {
            ToastsStore.error("Ups!! ha ocurrido un problema, intenta más tarde.");
        }
    }

    render() {
        return (
            <React.Fragment>
                <Link to={"/docentes?iduser=" + this.state.idusuario}>
                    <i className="fas fa-arrow-left"></i> Atrás
                </Link>

                <ToastsContainer store={ToastsStore} />

                <h5 className="mb-5 mt-4"><i className="far fa-edit"></i> Actualizar Docente</h5>

                <form onSubmit={this.actualizarDocente} >
                    <div className="row">
                        <div className="col-lg-3">
                            <small>Foto de perfil:</small>
                            <label htmlFor="file-upload-imagen5" className="subir-image">
                                <div className="imagen-upload">
                                    {this.imagenUpload()}
                                </div>
                            </label>
                            <input id="file-upload-imagen5" className="upload" type="file" accept="image/*"
                                onChange={this.seleccionarImagen1} />
                        </div>
                        <div className="col-lg-9">

                            <div className="row">
                                <div className="col-lg-7">
                                    <label>Nombres</label>
                                    <input onChange={this.handleChange} className="form-control" type="text" name="nombres" value={this.state.form.nombres} required />
                                </div>
                                <div className="col-lg-5">
                                    <label>Email</label>
                                    <input onChange={this.handleChange} className="form-control" type="email" name="email" value={this.state.form.email} />
                                </div>
                            </div>

                            <label className="lbl">Formación académica</label>
                            <textarea onChange={this.handleChange} className="form-control" name="formacion_academica" value={this.state.form.formacion_academica} required ></textarea>

                            <label className="lbl">Experiencia laboral</label>
                            <textarea onChange={this.handleChange} className="form-control" name="experiencia_laboral" value={this.state.form.experiencia_laboral}></textarea>

                            <div className="cont-btn">
                                <button className="btn btn-secondary">
                                    <i className="far fa-save"></i> Guardar docente
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default EditDocente;