import React from 'react';
import Navbar1 from './components/Navbar1';
import apiNoticia from '../providers/noticiaApi';
import Global from '../providers/urlGlobal';
import "../styles/NoticiaShow.css"

class NoticiaShow extends React.Component {
    state = {
        idusuario: 0,
        loading: false,
        error: false,
        noticia: {}
    }

    constructor(props, context) {
        super(props, context);
        this.state.idusuario = new URLSearchParams(this.props.location.search).get("idnoticia");
    }

    getNoticia = async () => {
        this.setState({ loading: true });
        try {
            const data = await apiNoticia.noticia.findNoticia(this.state.idusuario);
            console.log(data)
            this.setState({ loading: false, error: false, noticia: data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }

    componentDidMount() {
        this.getNoticia();
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

    render() {
        return (
            <React.Fragment>
                <Navbar1 />

                <br />

                <div className="container">
                    {this.spinner()}
                    {this.error()}
                    <div className="contenedor-image ">
                        <img src={Global.UrlGlobal.urlArchivos + this.state.noticia.portada_url} className="image-noticia" />


                    </div>



                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <h4 className="mt-3">{this.state.noticia.titulo}s</h4>
                            <p className="texto">{this.state.noticia.descripcion}</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NoticiaShow;