import React, {Component} from 'react';


class ImportCard extends Component {

    render() {
        return (
            <div className="col-sm-12 mb-4">
                <div className="card border-bottom-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text font-weight-bold text-primary text-uppercase mb-1">
                                    Automatic import
                                </div>
                            </div>
                        </div>
                        <hr className="sidebar-divider"/>
                        <form className="ml-4 mr-4" action="http://localhost:3001/data/file" method="POST" encType="multipart/form-data">
                            <div className="row">
                                <label htmlFor="pumpModelSelector">Pump model :</label>
                                <select className="form-control" id="pumpModelSelector" name="pumpModel">
                                    <option value="minimed" selected>MiniMed</option>
                                </select>
                            </div>
                            <div className="row form-group ">
                                <label className="invisible" htmlFor="dataFileAutoInput">Pump data csv :</label>
                                <input type="file" className="form-control-file" id="dataFileAutoInput" name="file"
                                       accept=".csv"/>
                            </div>
                            <div className="row d-flex justify-content-end">
                                <button type="submit" className="btn btn-secondary btn-icon-split">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-upload"/>
                                    </span>
                                    <span className="text">Upload data</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImportCard;
