import React from "react";
import "../../styles/NewNoticia.css";
import ImageUpload from "../../assets/image/image-icono.png";

class NewNoticia extends React.Component {

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
                                <label htmlFor="file-upload-imagen3" className="subir-image">
                                    <div className="imagen-upload">
                                        {this.imagenUpload()}
                                    </div>
                                </label>
                                <input id="file-upload-imagen3" className="upload" type="file" accept="image/*"
                                    onChange={this.props.uploadChange} />
                            </div>
                            <div className="col-lg-9">

                                <label>Título</label>
                                <input onChange={this.props.onChange} className="form-control" type="text" name="titulo" value={this.props.values.form.titulo} required />

                                <label className="lbl">Descripción</label>
                                <textarea onChange={this.props.onChange} className="form-control" name="descripcion" value={this.props.values.form.descripcion} required ></textarea>

                                <br />
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label>Tipo de noticia</label>
                                        <select className="form-select" onChange={this.props.onChange} name="tipo_noticia" value={this.props.values.form.tipo_noticia} required>
                                            <option defaultValue="Normal">Normal</option>
                                            <option defaultValue="Destacado">Destacado</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="cont-btn">
                                    <button className="btn btn-secondary">
                                        <i className="far fa-save"></i> Guardar Noticia
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

export default NewNoticia;