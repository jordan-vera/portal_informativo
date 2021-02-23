import React from 'react';
import "../../styles/Destacado.css";
import apiNoticia from '../../providers/noticiaApi';
import Global from '../../providers/urlGlobal';
import { Link } from 'react-router-dom';

class Destacado extends React.Component {

    state = {
        noticias: []
    }

    getNoticias = async () => {
        try {
            const data = await apiNoticia.noticia.getByTipo('Destacado');
            this.setState({ noticias: data })
        } catch (error) {
        }
    }

    componentDidMount() {
        this.getNoticias();
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

    render() {
        return (
            <React.Fragment>
                <div className="card card-destacado">
                    <div className="card-header destacado">
                        <h5><i className="far fa-newspaper"></i> Noticias Destacadas</h5>
                    </div>
                    <div className="card-body pb-0">
                        <div className="container ps-0 pe-0">
                            {
                                this.state.noticias.map((noticia, idx) => {
                                    if (idx < 2) {
                                        return (
                                            <div className="row mb-2 pb-1 pt-1 border-bottom" key={noticia.idnoticia}>
                                                <div className="col-lg-3" >
                                                    <img src={Global.UrlGlobal.urlArchivos + noticia.portada_url} className="image-noticia" />
                                                </div>

                                                <div className="col-lg-8 ps-0" >
                                                    <h5>
                                                        <Link to={"/noticia?idnoticia=" + noticia.idnoticia}>{noticia.titulo}</Link>
                                                    </h5>
                                                    <p className="descripcion-noticia">{noticia.descripcion}</p>
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
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}

export default Destacado;