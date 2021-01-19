import React from 'react';
import "../../styles/Destacado.css";
import apiNoticia from '../../providers/noticiaApi';
import Global from '../../providers/urlGlobal';
import { Link } from 'react-router-dom';

class Destacado extends React.Component {

    state = {
        noticias: []
    }

    onPrevious() {
        var elemt = document.getElementById('panel');
        elemt.scrollLeft -= 400;
    }

    onNext() {
        var elemts = document.getElementById('panel');
        elemts.scrollLeft += 400;
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
                <div className="destacado">
                    <h5>Noticias Destacadas</h5>
                </div>

                <div className="container testimonial-group2 border-top border-bottom pb-2">
                    <div className="row" id="panel">
                        {
                            this.state.noticias.map((noticia) => {
                                return (
                                    <div className="col-lg-12 border-end" key={noticia.idnoticia}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <img src={Global.UrlGlobal.urlArchivos + noticia.portada_url} className="image-noticia" />
                                            </div>
                                            <div className="col-lg-6 descripcion-noticia">
                                                <h5>
                                                    <Link to={"/noticia?idnoticia=" + noticia.idnoticia}>{noticia.titulo}</Link>
                                                </h5>
                                                <p className="descripcion-noticia">{noticia.descripcion}</p>
                                                <div className="fecha-noticia">
                                                    Fecha: {this.trasformarFecha(noticia.created_at)}
                                                </div>
                                                <button className="btn btn-sm btn-info btn-voz" onClick={
                                                    () => {
                                                        let texto = noticia.titulo + ' ' + noticia.descripcion
                                                        this.generarVoz(texto)
                                                    }
                                                }>
                                                    <i className="fas fa-volume-up"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="btn-izquierda">
                        <button className="rounded" onClick={this.onPrevious}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                    </div>
                    <div className="btn-derecha">
                        <button className="rounded" onClick={this.onNext}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Destacado;