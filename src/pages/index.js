import React from 'react';
import Navbar1 from './components/Navbar1';
import Destacado from './components/Destacado';
import ListaNoticias from './components/ListaNoticias';
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
                                    <div className="col-lg-9 border-end p-3">

                                        <Destacado />

                                        <ListaNoticias />

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