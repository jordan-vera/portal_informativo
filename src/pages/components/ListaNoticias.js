import React from 'react';
import Global from '../../providers/urlGlobal';
import apiNoticia from '../../providers/noticiaApi';
import "../../styles/ListaNoticias.css";
import { Link } from 'react-router-dom';

class ListaNoticias extends React.Component {

    state = {
        noticias: [],
        error: false,
        loading: false,
        search: null
    }

    getAllNoticias = async () => {
        this.setState({ loading: true });
        try {
            const data = await apiNoticia.noticia.getByTipo('Normal');
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

    trasformarFecha(fechaDate) {
        let fecha = fechaDate.substr(0, 10);
        return fecha;
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

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword })
    }

    render() {
        const items = this.state.noticias.filter((noticia) => {
            if (this.state.search == null) {
                return noticia;
            } else if (noticia.titulo.toLowerCase().includes(this.state.search.toLowerCase())) {
                return noticia;
            }
        }).map(noticia => {
            return (
                <div className="row border-bottom mb-3 pb-2" key={noticia.idnoticia}>
                    <div className="col-lg-3">
                        <img src={Global.UrlGlobal.urlArchivos + noticia.portada_url} className="image-noticia" />
                    </div>
                    <div className="col-lg-8 col-descripcion">
                        <h5><Link to={"/noticia?idnoticia=" + noticia.idnoticia}>{noticia.titulo}</Link></h5>

                        <p className="descripcion-noticia">{noticia.descripcion}</p>
                        Fecha: {this.trasformarFecha(noticia.created_at)}
                    </div>
                    <div className="col-lg-1 col-descripcion">
                        <button className="btn btn-sm btn-info" onClick={
                            () => {
                                let texto = noticia.titulo + ' ' + noticia.descripcion
                                this.generarVoz(texto)
                            }
                        }>
                            <i className="fas fa-volume-up"></i>
                        </button>
                    </div>
                </div>
            );
        })
        return (
            <React.Fragment>
                <div className="container mt-2">
                    <div className="row border-bottom pb-2">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-8">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Buscar" onChange={(e) => this.searchSpace(e)} />
                                <button className="btn btn-outline-secondary" type="button" >
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                    <br />
                    {items}
                </div>
            </React.Fragment>
        );
    }
}

export default ListaNoticias;