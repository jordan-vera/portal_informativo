import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/image/logo.png';
import '../../styles/Navbar.css';

class Navbar1 extends React.Component {
    acceder = () => {
        if (this.props.estado === 'normal') {
            return (
                <div className="iniciar-sesion">
                    <Link to="/login">
                        <i className="fas fa-user"></i> <label>Acceder</label>
                    </Link>
                </div>
            );
        } else if (this.props.estado === 'login') {
            return;
        } else if (this.props.estado === 'panel') {
            return (
                <div className="cerrar-sesion">
                    <Link to="/login">
                        <i className="fas fa-sign-out-alt"></i> <label>Cerrar sesión</label>
                    </Link>
                </div>
            );
        } else {
            return;
        }
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar1" >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3">
                                <img src={Logo} className="logo" />
                            </div>
                            <div className="col-lg-6 titulo">
                                <h4>Bienvenidos al portal infomativo de la carrera de Sistemas de información</h4>
                            </div>
                            <div className="col-lg-3">
                                {this.acceder()}
                            </div>
                        </div>
                    </div>

                </nav>
            </React.Fragment>
        );
    }
}

export default Navbar1;