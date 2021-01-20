import React from 'react';
import Navbar1 from './components/Navbar1';
import NoticiasPanel from './noticias-panel';
import VideosPanel from './videos-panel';
import DocentesPanel from './docentes-panel';
import MicuentaPanel from './micuenta-panel';
import EditNoticia from './components/EditNoticia';
import EditDocente from './components/EditDocente';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';

class PanelAdmin extends React.Component {

    state = {
        idusuario: 0
    }

    constructor(props, context) {
        super(props, context);
        this.state.idusuario = new URLSearchParams(this.props.location.search).get("iduser");
    }


    render() {
        return (
            <React.Fragment>
                <Navbar1 estado="panel" />
                <BrowserRouter basename="/panel-admin">
                    <br />
                    <div className="container">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-3 border-end ">
                                        <div className="list-group">
                                            <Link to={"/noticias?iduser=" + this.state.idusuario} className="list-group-item list-group-item-action">
                                                <i className="far fa-newspaper"></i> Noticias
                                            </Link>
                                            <Link to={"/videos?iduser=" + this.state.idusuario} className="list-group-item list-group-item-action">
                                                <i className="fas fa-photo-video"></i> Videos
                                            </Link>
                                            <Link to={"/docentes?iduser=" + this.state.idusuario} className="list-group-item list-group-item-action">
                                                <i className="fas fa-chalkboard-teacher"></i> Docentes
                                            </Link>
                                            <Link to={"/perfil?iduser=" + this.state.idusuario} className="list-group-item list-group-item-action">
                                                <i className="far fa-user-circle"></i> Mi cuenta
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-9">
                                        <Switch>
                                            <Route exact path="/" component={NoticiasPanel} />
                                            <Route exact path="/noticias" component={NoticiasPanel} />
                                            <Route exact path="/videos" component={VideosPanel} />
                                            <Route exact path="/docentes" component={DocentesPanel} />
                                            <Route exact path="/perfil" component={MicuentaPanel} />
                                            <Route exact path="/edit-noticia" component={EditNoticia} />
                                            <Route exact path="/edit-docente" component={EditDocente} />
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );

    }
}

export default PanelAdmin;