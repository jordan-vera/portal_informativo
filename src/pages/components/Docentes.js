import React from 'react';
import { Link } from 'react-router-dom';
import apiDocente from '../../providers/docenteApi';
import Global from '../../providers/urlGlobal';
import "../../styles/Docente.css";

class Docentes extends React.Component {

    state = {
        docentes: [],
        error: false,
        loading: false
    }

    getAllDocentes = async () => {
        this.setState({ loading: true });
        try {
            const data = await apiDocente.docente.allshow();
            this.setState({ loading: false, error: false, docentes: data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
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

    componentDidMount() {
        this.getAllDocentes();
    }

    render() {
        return (
            <React.Fragment>
                <h5>
                    Docentes
                </h5>
                {this.spinner()}
                {this.error()}

                {
                    this.state.docentes.map((docente) => {
                        return (
                            <div className="docente border-bottom" key={docente.iddocente}>
                                <div >
                                    <img src={Global.UrlGlobal.urlArchivos + docente.foto} className="image-docente" />
                                </div>
                                <label>
                                    {docente.nombres}
                                </label>
                                <br />
                                <label>{docente.email}</label>
                                <br></br>
                                <Link to={"/docente?iddocente=" + docente.iddocente}>Más información..</Link>
                            </div>
                        );
                    })
                }
            </React.Fragment>
        );
    }
}

export default Docentes;