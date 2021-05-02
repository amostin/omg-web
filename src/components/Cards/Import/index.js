import React, {Component} from 'react';
import {postUpload} from "../../../services/omgServer";


class ImportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upload: 0,
            file: '',
            modelPump: '',
            resultRequest: ''
        }
    }

    uploadFile = () => {
        this.setState({upload: 1});
        postUpload(document.getElementById('dataFileAutoInput')).then((res) => {
            if (res[0].ok){
                this.setState({upload: 2})
            }
            else {
                this.setState({upload: -1})
            }
            this.setState({'resultRequest': res[1]})
        }).catch(res => this.setState({'upload': -1, 'resultRequest': res.toString()}))
    }

    fileChange = (event) => {
        this.setState({'file': event.target.value});
    }

    modelPumpChange = (event) => {
        this.setState({'modelPump': event.target.value});
    }

    removeBorderBottom(){
        let domElementClassList = document.getElementById("uploadCard").classList
        domElementClassList.forEach((className) => {
            if (className.startsWith('border-bottom')){
                domElementClassList.remove(className);
            }
        });
    }

    uploadResults() {
        let results = ""
        if (this.state.upload === -1){
            this.removeBorderBottom();
            document.getElementById("uploadCard").classList.add('border-bottom-danger');
            results = <h3 className="text-danger">Upload error : {this.state.resultRequest}</h3>
        }
        if (this.state.upload === 1){
            this.removeBorderBottom();
            document.getElementById("uploadCard").classList.add('border-bottom-primary');
            results = <h3 className="text-primary">Upload in progress...</h3>
        }
        if (this.state.upload === 2){
            this.removeBorderBottom();
            document.getElementById("uploadCard").classList.add('border-bottom-success');
            results = <h3 className="text-success">Upload successful !</h3>
        }
        return (
            <div className="row d-flex justify-content-center mt-4">
                {results}
            </div>
        );
    }

    render() {
        return (
            <div className="col-sm-12 mb-4">
                <div id="uploadCard" className="card border-bottom-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text font-weight-bold text-primary text-uppercase mb-1">
                                    Automatic import
                                </div>
                            </div>
                        </div>
                        <hr className="sidebar-divider"/>
                        <form className="ml-4 mr-4" id="uploadForm">
                            <div className="row">
                                <label htmlFor="pumpModelSelector">Pump model :</label>
                                <select className="form-control" id="pumpModelSelector" name="pumpModel"
                                        onChange={this.modelPumpChange}>
                                    <option value="minimed">MiniMed</option>
                                </select>
                            </div>
                            <div className="row form-group ">
                                <label className="invisible" htmlFor="dataFileAutoInput">Pump data csv :</label>
                                <input type="file" className="form-control-file" id="dataFileAutoInput" name="file"
                                       accept=".csv" onChange={this.fileChange}/>
                            </div>
                        </form>
                        <div className="row d-flex justify-content-end mr-4">
                            <button className="btn btn-primary btn-icon-split" onClick={this.uploadFile}>
                                    <span className="icon text-white-50">
                                        <i className="fas fa-upload"/>
                                    </span>
                                <span className="text">Upload data</span>
                            </button>
                        </div>
                        {this.uploadResults()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ImportCard;
