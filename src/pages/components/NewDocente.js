import React from 'react';
import "../../styles/NewDocente.css";
import ImageUpload from "../../assets/image/image-icono.png";

class NewDocente extends React.Component {

    imagenUpload = () => {
        if (!this.props.values.img) {
            return <img src={ImageUpload} />
        } else {
            return <img src={this.props.values.imageSrc} />
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container border-bottom">
                    <h5><i className="fas fa-user-plus"></i> Agregar Docentes de informática</h5>
                    <br />
                    <form onSubmit={this.props.onSubmit} >
                        <div className="row">
                            <div className="col-lg-3">
                                <small>Foto de perfil:</small>
                                <label htmlFor="file-upload-imagen1" className="subir-image">
                                    <div className="imagen-upload">
                                        {this.imagenUpload()}
                                    </div>
                                </label>
                                <input id="file-upload-imagen1" className="upload" type="file" accept="image/*"
                                    onChange={this.props.uploadChange} />
                            </div>
                            <div className="col-lg-9">

                                <div className="row">
                                    <div className="col-lg-7">
                                        <label>Nombres</label>
                                        <input onChange={this.props.onChange} className="form-control" type="text" name="nombres" value={this.props.values.form.nombres} />
                                    </div>
                                    <div className="col-lg-5">
                                        <label>Email</label>
                                        <input onChange={this.props.onChange} className="form-control" type="email" name="email" value={this.props.values.form.email} />
                                    </div>
                                </div>

                                <label className="lbl">Formación académica</label>
                                <textarea onChange={this.props.onChange} className="form-control" name="formacion_academica" value={this.props.values.form.formacion_academica} ></textarea>

                                <label className="lbl">Experiencia laboral</label>
                                <textarea onChange={this.props.onChange} className="form-control" name="experiencia_laboral" value={this.props.values.form.experiencia_laboral}></textarea>

                                <div className="cont-btn">
                                    <button className="btn btn-secondary">
                                        <i className="far fa-save"></i> Guardar docente
                                </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}


export default NewDocente;