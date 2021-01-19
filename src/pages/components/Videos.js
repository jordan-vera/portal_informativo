import React from 'react';
import apiVideo from '../../providers/videoApi';
import "../../styles/Videos.css";

class Videos extends React.Component {

    state = {
        videos: [],
        loading: false,
        error: false
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

    render() {
        return (
            <React.Fragment>
                <h5>Videos</h5>

                {this.spinner()}
                {this.error()}

                {
                    this.state.videos.map((video) => {
                        return (
                            <div className="videos border-bottom" key={video.idvideo}>
                                <iframe width="235" height="170" src={this.transformarUrl(video.video_url)} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                <div>
                                    {video.titulo}
                                </div>
                                <p>{video.descripcion}</p>
                            </div>
                        );
                    })
                }
            </React.Fragment>
        );
    }
}

export default Videos;