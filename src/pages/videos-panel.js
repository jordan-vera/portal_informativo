import React from 'react';
import NewVideo from './components/NewVideo';
import apiVideo from '../providers/videoApi';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import "../styles/videos-panel.css";

class VideosPanel extends React.Component {

    state = {
        form: {
            titulo: '',
            descripcion: '',
            video_url: '',
        },
        loading: false,
        error: false,
        videos: []
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ... this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    limpiar = () => {
        this.setState({
            form: {
                titulo: '',
                descripcion: '',
                video_url: '',
            }
        });
    }

    guardarVideo = async (e) => {
        e.preventDefault();
        try {
            await apiVideo.video.create(this.state.form);
            this.limpiar();
            this.getAllVideos();
            ToastsStore.success(<div className="mesage"> <i className="fas fa-check"></i> Video agregado correctamente!! </div>);
        } catch (error) {
            ToastsStore.error("Ups!! ha ocurrido un problema, intenta más tarde.");
        }
    }

    getAllVideos = async () => {
        this.setState({ loading: true });
        try {
            const data = await apiVideo.video.allshow();
            this.setState({ loading: false, error: false, videos: data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }

    componentDidMount() {
        this.getAllVideos();
    }

    transformarUrl(url) {
        let urlPartes = url.split("=");
        var idVideo = urlPartes[1];
        let partesIncluidas = idVideo.split('&');
        if (partesIncluidas.length > 0) {
            idVideo = partesIncluidas[0];
        }
        return `https://www.youtube.com/embed/${idVideo}`;
    }

    async eliminarDocente(idvideo) {
        try {
            await apiVideo.video.remove(idvideo);
            ToastsStore.success(<div className="mesage"> <i className="fas fa-check"></i> Video eliminado correctamente!! </div>);
            this.getAllVideos();
        } catch (error) {
            ToastsStore.error("Ups!! ha ocurrido un problema, intenta más tarde.");
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

    render() {
        return (
            <React.Fragment>
                <NewVideo formValues={this.state.form} onChange={this.handleChange} onSubmit={this.guardarVideo} />

                <ToastsContainer store={ToastsStore} />

                <div className="container">
                    <h5>Mostrar Videos</h5>
                    {this.spinner()}
                    {this.error()}
                    {
                        this.state.videos.map((video) => {
                            return (
                                <div className="row fila-videos border-bottom" key={video.idvideo}>
                                    <div className="col-lg-4">
                                        <iframe width="235" height="170" src={this.transformarUrl(video.video_url)} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </div>
                                    <div className="col-lg-8">
                                        <h5>{video.titulo}</h5>
                                        <p>{video.descripcion}</p>
                                        <div className="text-end">
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => this.eliminarDocente(video.idvideo)}>
                                                <i className="far fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </React.Fragment>
        );
    }
}

export default VideosPanel;