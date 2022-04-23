import React, {Component} from 'react';
import {postUpload, detectEventInRange} from "../../services/omgServer";

/**
 * component that implements the method of importing the data of a user via a CSV file
 */
class ImportFileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upload: "",  // state of the upload (0 -> not started, 1 -> request sent, 2 -> success, 3 -> detecting event -1 -> error)
            file: '',   // CSV data file
            sensorModel: 'none',  // Chosen model pump
            resultRequest: '', // API results of the request
            importName: '', // Name of the import saved in database for deletion
        }
    }

    /**
     * manages the sending and the result of the data import request.
     */
    uploadFile = () => {
        if (this.state.sensorModel !== "none") {
            if (this.state.file) {
                if (this.state.importName) {
                    this.setState({upload: 1});
                    // console.log(getDataDatetime());
                    postUpload(document.getElementById('dataFileAutoInput'), this.state.sensorModel, this.state.importName).then((res) => {
                        if (res[0].ok) {
                            this.setState({upload: 3});
                            detectEventInRange();
                        } else {
                            this.setState({upload: -1})
                        }
                        this.setState({'resultRequest': res[1]})
                    }).catch(res => this.setState({'upload': -1, 'resultRequest': res.toString()}));

                } else {
                    if (!document.getElementById("importName").classList.contains("is-invalid")) {
                        document.getElementById("importName").classList.add("is-invalid");
                    }
                }
            } else {
                if (!document.getElementById("dataFileAutoInput").classList.contains("is-invalid")) {
                    document.getElementById("dataFileAutoInput").classList.add("is-invalid");
                }
            }
        } else {
            if (!document.getElementById("sensorModelSelector").classList.contains("is-invalid")) {
                document.getElementById("sensorModelSelector").classList.add("is-invalid");
            }

        }
    }

    fileChange = (event) => {
        let now = new Date(Date.now());
        let filename = document.getElementById("dataFileAutoInput").files[0].name + " - " + now.toLocaleString();
        this.setState({file: event.target.value, importName: filename});
        document.getElementById("importName").value = filename;
        if (document.getElementById("dataFileAutoInput").classList.contains("is-invalid")) {
            document.getElementById("dataFileAutoInput").classList.remove("is-invalid");
        }
        if (document.getElementById("importName").classList.contains("is-invalid")) {
            document.getElementById("importName").classList.remove("is-invalid");
        }
        this.setState({upload: 0});
    }

    importNameChange = (event) => {
        this.setState({importName: event.target.value});
        if (document.getElementById("importName").classList.contains("is-invalid")) {
            document.getElementById("importName").classList.remove("is-invalid");
        }
        this.setState({upload: 0});
    }

    sensorModelChange = (event) => {
        this.setState({'sensorModel': event.target.value});
        if (document.getElementById("sensorModelSelector").classList.contains("is-invalid")) {
            document.getElementById("sensorModelSelector").classList.remove("is-invalid");
        }
        this.setState({upload: 0});
    }

    /**
     * manages the display of the status of the data import request
     *
     * @return {JSX.Element}
     */
    uploadResults() {
        let upBtn = document.getElementById("uploadButton");
        if (this.state.upload === -1) {
            this.changeUploadButtonStatus("fa-times", "btn-danger", "error");
            document.getElementById("uploadButtonInvalidText").innerText = this.state.resultRequest;
        }
        if (this.state.upload === 0) {
            this.changeUploadButtonStatus("fa-upload", "btn-primary", "upload data");
            upBtn.removeAttribute("disabled");
            document.getElementById("uploadButtonInvalidText").innerText = "";
        }
        if (this.state.upload === 1) {
            this.changeUploadButtonStatus("fa-sync-alt", "btn-primary", "uploading...");
        }
        if (this.state.upload === 2) {
            this.changeUploadButtonStatus("fa-check", "btn-success", "uploaded !");
        }
        if (this.state.upload === 3) {
            this.changeUploadButtonStatus("fa-sync-alt", "btn-success", "detecting event...");
        }
    }

    /**
     * Visual change of upload button
     *
     * @param newIcon
     * @param newBtnColor
     * @param btnText
     */
    changeUploadButtonStatus = (newIcon, newBtnColor, btnText) => {
        let upBtn = document.getElementById("uploadButton");
        let upBtnIcn = document.getElementById("uploadButtonIcon");
        let upBtnTxt = document.getElementById("uploadButtonText");
        upBtnIcn.classList.forEach((className) => {
            if (className.startsWith('fa-')) {
                upBtnIcn.classList.remove(className);
            }
        });
        upBtn.classList.forEach((className) => {
            if (className.startsWith('btn-primary') || className.startsWith('btn-danger') || className.startsWith('btn-success')) {
                upBtn.classList.remove(className);
            }
        });
        upBtn.setAttribute("disabled", "true");
        upBtn.classList.add(newBtnColor);
        upBtnIcn.classList.add(newIcon);
        upBtnTxt.innerText = btnText;
    }

    render() {
        return (
            <div>
                <div id="uploadCard" className="card d-flex border-bottom-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text font-weight-bold text-primary text-uppercase">
                                    File import
                                </div>
                            </div>
                        </div>
                        <hr className="sidebar-divider"/>
                        <form className="ml-2 mr-2" id="uploadForm">
                            <div className="row form-group">
                                <label className={"form-check-label"} htmlFor="sensorModelSelector">Sensor model</label>
                                <select className="form-control" id="sensorModelSelector" name="pumpModel"
                                        onChange={this.sensorModelChange} defaultValue={{value: "none"}}>
                                    <option value="none">Choose a model...</option>
                                    <option value="minimed">MiniMed</option>
                                </select>
                                <div className={"invalid-feedback"}>You have to choose a model</div>
                            </div>

                            <div className="row form-group mt-2">
                                <label className={"form-check-label"} htmlFor="importName">Import name (default : filename)</label>
                                <input type="text" className={"form-control"} id="importName" onChange={this.importNameChange}/>
                                <div className={"invalid-feedback"}>You have to enter a import name</div>
                            </div>
                            <div className="row form-group mt-2">
                                <label className={"form-check-label"} htmlFor="dataFileAutoInput">Sensor data CSV</label>
                                <input type="file" className="form-control-file" id="dataFileAutoInput" name="file" accept=".csv" onChange={this.fileChange}/>
                                <div className={"invalid-feedback"}>You have to choose a CSV file</div>
                            </div>
                        </form>
                        <div className="row d-flex align-items-center justify-content-end mr-2">
                            <div id={"uploadButtonInvalidText"} className={"text-danger mr-4"}/>
                            <button id={"uploadButton"} className="btn btn-primary btn-icon-split" onClick={this.uploadFile}>
                                <span className="icon text-white-50">
                                    <i id={"uploadButtonIcon"} className="fas fa-upload"/>
                                </span>
                                <span id={"uploadButtonText"} className="text">Upload data</span>
                            </button>
                        </div>
                        <div className="float-right">
                            <input className="form-check-input " type="checkbox" id={"checkIt"} checked/>
                            <label className="form-check-label " htmlFor={"checkIt"}>auto detection</label>
                        </div>
                        {this.uploadResults()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ImportFileCard;
