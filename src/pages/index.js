import React from 'react';
import Navbar1 from './components/Navbar1';
import Destacado from './components/Destacado';
import '../styles/index.css';
import Docentes from './components/Docentes';
import Videos from './components/Videos';

class Index extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar1 estado='normal' />

                <div className="container cuerpo">
                    <div className="card">
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="row border-bottom pb-2">
                                            <div className="col-lg-3"></div>
                                            <div className="col-lg-8">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Buscar" />
                                                    <button className="btn btn-outline-secondary" type="button" >
                                                        <i className="fas fa-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-lg-1"></div>
                                        </div>

                                        <Destacado />
                                    </div>
                                    <div className="col-lg-3">
                                        <Docentes />
                                        <br />
                                        <Videos />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Index;