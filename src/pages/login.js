import React from 'react';
import { Link } from 'react-router-dom';
import Navbar1 from './components/Navbar1';
import '../styles/login.css';
import apiUsuario from '../providers/usuarioApi';

class Login extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    state = {
        form: {
            email: '',
            clave: ''
        },
        loading: false,
        error: false,
        credencialesIncorrectas: false,
    }

    validar = async () => {
        this.setState({ loading: true });
        try {
            const data = await apiUsuario.usuarios.login(this.state.form.email, this.state.form.clave);
            if (data.response === 'done') {
                this.setState({ loading: false, error: false, credencialesIncorrectas: false });
                this.props.history.push("/panel-admin?iduser=" + data.idusuario)
            } else {
                this.setState({ loading: false, error: false, credencialesIncorrectas: true });
            }
        } catch (error) {
            this.setState({ loading: false, error: true, credencialesIncorrectas: false });
        }
    }

    acionesSecundarias = () => {
        if (this.state.loading) {
            return (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        } else if (this.state.error) {
            return (
                <div className="error rounded">
                    <i className="fas fa-times"></i> Upss se ha producido un error, intenta mas tarde!!
                </div>
            );
        } else if (this.state.credencialesIncorrectas) {
            return (
                <div className="error rounded">
                    <i className="fas fa-times"></i> Tus credenciales son incorrectas!!
                </div>
            );
        } else {
            return;
        }
    }


    handleChange = async e => {
        this.setState({
            form: {
                ... this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <Navbar1 estado='login' />
                <div className="container ">
                    <div className="breadcrumb-login">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to='/'>
                                        <i className="fas fa-home"></i> Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Login</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-4">
                            {this.acionesSecundarias()}
                        </div>
                    </div>

                    <div className="row justify-content-center ">
                        <div className="col-lg-3 ">
                            <div className="formulario">
                                <h5><i className="far fa-user"></i> Ingresar al sistema</h5>

                                <label>Usuario</label>
                                <input onChange={this.handleChange} className="form-control" name="email" value={this.state.form.email} />

                                <label>Contraseña</label>
                                <input onChange={this.handleChange} className="form-control" type="password" name="clave" value={this.state.form.clave} />

                                <button className="btn btn-outline-secondary" onClick={this.validar}>Ingresar</button>
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}


export default Login;