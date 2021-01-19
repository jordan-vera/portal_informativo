import React from 'react';
import apiUsuario from '../providers/usuarioApi';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import Usuario from '../modelo/Usuario';
import md5 from 'md5';

class MicuentaPanel extends React.Component {

    state = {
        form: {
            nombres: '',
            email: '',
            clave: ''
        },
        idusuario: 0,
        user: {},
        clave_recibida: ''
    }

    constructor(props, context) {
        super(props, context);
        this.state.idusuario = new URLSearchParams(this.props.location.search).get("iduser");
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ... this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    findUser = async () => {
        try {
            const data = await apiUsuario.usuarios.findUser(this.state.idusuario);
            this.setState({ form: { nombres: data.nombres, email: data.email, clave: '' }, clave_recibida: data.clave });
        } catch (error) {
        }
    }

    componentDidMount() {
        this.findUser();
    }

    updateUser = async (e) => {
        e.preventDefault();
        var claveUser = '';
        if (this.state.form.clave === '') {
            claveUser = this.state.clave_recibida;
        } else {
            claveUser = md5(this.state.form.clave);
        }

        let usuario = new Usuario(this.state.form.nombres, this.state.form.email, claveUser);

        try {
            await apiUsuario.usuarios.updateUser(this.state.idusuario, usuario);
            ToastsStore.success(<div className="mesage"> <i className="fas fa-check"></i> Datos actualizados correctamente!! </div>);
        } catch (error) {
            ToastsStore.error("Ups!! ha ocurrido un problema, intenta más tarde.");
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h5>Mis datos</h5>

                    <br />
                    <ToastsContainer store={ToastsStore} />

                    <div className="row">
                        <div className="col-lg-4">
                            <form onSubmit={this.updateUser}>
                                <label>Nombres</label>
                                <input onChange={this.handleChange} className="form-control" type="text" name="nombres" value={this.state.form.nombres} />

                                <br />
                                <label>Email</label>
                                <input onChange={this.handleChange} className="form-control" type="text" name="email" value={this.state.form.email} />

                                <br />

                                <label>Contraseña</label>
                                <input onChange={this.handleChange} className="form-control" type="password" name="clave" value={this.state.form.clave} minLength="5" />

                                <div className="text-end">
                                    <button className="btn btn-secondary mt-3">Actualizar</button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </React.Fragment>
        );
    }
}

export default MicuentaPanel;