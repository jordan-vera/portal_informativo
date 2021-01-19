import React from 'react';
import "../../styles/NewVideo.css";

class NewVideo extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h5><i className="fas fa-user-plus"></i> Agregar Videos</h5>
                <form onSubmit={this.props.onSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 formulario-video">
                                <label>Título del video</label>
                                <input className="form-control" type="text" onChange={this.props.onChange} name="titulo" value={this.props.formValues.titulo} required />

                                <label>Descripción</label>
                                <textarea className="form-control" type="text" onChange={this.props.onChange} name="descripcion" value={this.props.formValues.descripcion} required></textarea>

                                <label>Url del video</label>
                                <input className="form-control" type="text" onChange={this.props.onChange} name="video_url" value={this.props.formValues.video_url} required />

                                <div className="text-end">
                                    <button className="btn btn-info"><i className="far fa-save"></i> Agregar video</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default NewVideo;