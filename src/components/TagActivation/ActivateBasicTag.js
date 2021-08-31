import React, {Component} from 'react';
import CardBasicTitle from "../Cards/CardBasicTitle";
import {getRecentTags, postBasicTag} from "../../services/omgServer";
import TextField from '@material-ui/core/TextField';

class ActivateBasicTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recentTags: [],
            chosenDatetime: this.getDatePickerFormat(new Date(Date.now())),
            chosenTag: "",
            status: ""
        }
    }

    componentDidMount() {
        getRecentTags().then((res) => {
            if (res) {
                this.setState({recentTags: res});
            } else {
                console.log(res);
            }
        });
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.chosenTag !== prevState.chosenTag) {
    //         console.log(this.state.chosenTag);
    //     }
    // }

    chosenDatetimeChange = (event) => {
        this.setState({chosenDatetime: this.getDatePickerFormat(new Date(event.target.value))});
        if (this.state.status !== 0) {
            this.setState({status: 0});
        }
    }

    recentTagClick = (event) => {
        let manualTagInput = document.getElementById("manualBasicTagInput");
        manualTagInput.value = event.target.value;
        // if (manualTagInput.value !== "") {
        //     manualTagInput.value = "";
        // }
        this.setState({chosenTag: event.target.value});
        if (this.state.status !== 0) {
            this.setState({status: 0});
        }
    }

    manualBasicTagInputChange = (event) => {
        let radio = document.querySelector('input[type="radio"][name="recentTagsButtons"]:checked');
        if (radio) {
            radio.checked = false;
            document.getElementById("recentTagsLbl" + radio.id.substr(13)).classList.remove("active");
        }
        this.setState({chosenTag: event.target.value});

        if (this.state.status !== 0) {
            this.setState({status: 0});
        }
    }

    basicConfirmButtonClick = () => {
        if (this.state.chosenTag) {
            this.setState({status: 1});
            let chosenDatatimeISO = new Date(this.state.chosenDatetime).toISOString();
            postBasicTag(this.state.chosenTag, chosenDatatimeISO).then(res => {
                if (res){
                    this.setState({status: 2});
                } else {
                    this.setState({status: -1});
                }
            });
        } else {
            document.getElementById("basicConfirmButtonInvalidText").innerText = "You have to select/enter a tag";
        }
    }

    /**
     * manages the display of the status of the tag activation (basic confirm button)
     *
     * @return {JSX.Element}
     */
    activationResults() {
        let basicBtn = document.getElementById("basicConfirmButton");
        if (this.state.status === -1) {
            this.changeBasicConfirmButtonStatus("btn-danger", "error");
            document.getElementById("uploadButtonInvalidText").innerText = this.state.resultRequest;
        }
        if (this.state.status === 0) {
            this.changeBasicConfirmButtonStatus("btn-primary", "Activate tag");
            basicBtn.removeAttribute("disabled");
            document.getElementById("basicConfirmButtonInvalidText").innerText = "";
        }
        if (this.state.status === 1) {
            this.changeBasicConfirmButtonStatus("btn-primary", "activating...");
        }
        if (this.state.status === 2) {
            this.changeBasicConfirmButtonStatus("btn-success", "tag activated !");
        }
    }

    /**
     * Visual change of basic confirm button
     *
     * @param newBtnColor
     * @param btnText
     */
    changeBasicConfirmButtonStatus = (newBtnColor, btnText) => {
        let basicBtn = document.getElementById("basicConfirmButton");
        let basicBtnTxt = document.getElementById("basicConfirmButtonText");
        basicBtn.classList.forEach((className) => {
            if (className.startsWith('btn-primary') || className.startsWith('btn-danger') || className.startsWith('btn-success')) {
                basicBtn.classList.remove(className);
            }
        });
        basicBtn.setAttribute("disabled", "true");
        basicBtn.classList.add(newBtnColor);
        basicBtnTxt.innerText = btnText;
    }

    /**
     * Displays recent tags
     *
     * @return {JSX.Element}
     */
    showRecentTags() {
        if (this.state.recentTags.length > 0) {
            return (
                <div className={"d-flex mt-2 flex-column"}>
                    <p className={"mb-0 text-uppercase"}>Recent tags</p>
                    <div className={"d-inline-flex flex-wrap btn-group-toggle"} data-toggle={"buttons"}>
                        {
                            this.state.recentTags.map((tag) => (
                                <label id={"recentTagsLbl" + this.state.recentTags.indexOf(tag)} key={"recentTagsLbl" + this.state.recentTags.indexOf(tag)} className={"btn btn-outline-primary mt-2 ml-1 mr-1 pl-2 pr-2 pt-1 pb-1"}>
                                    <input
                                        type="radio"
                                        name="recentTagsButtons"
                                        key={"recentTagsBtn" + this.state.recentTags.indexOf(tag)}
                                        id={"recentTagsBtn" + this.state.recentTags.indexOf(tag)}
                                        value={tag}
                                        onClick={this.recentTagClick}
                                    />
                                    {tag}
                                </label>
                            ))
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <p>No tag previously activated.</p>
            );
        }
    };

    manualTag() {
        return (
            <div className={"mt-3"}>
                <p className={"mb-2 text-uppercase"}>Manual</p>
                <input
                    id={"manualBasicTagInput"}
                    className={"form-control form-control-plaintext border pl-2 border-bottom-primary"}
                    placeholder={"Enter a tag"}
                    onChange={this.manualBasicTagInputChange}
                />
            </div>
        );
    }

    showDatetime() {
        return (
            <div className={"mt-3 d-flex flex-column"}>
                <p className={"mb-1 text-uppercase"}>Datetime</p>
                <TextField
                    value={this.state.chosenDatetime}
                    onChange={this.chosenDatetimeChange}
                    id="datetimePickerBasicTag"
                    type="datetime-local"
                    className={"w-100 rounded"}
                />
            </div>
        );
    }

    roundTo5Minutes(date) {
        let coeff = 1000 * 60 * 5;
        return new Date(Math.round(date.getTime() / coeff) * coeff);
    }

    getDatePickerFormat(date) {
        let initDate = this.roundTo5Minutes(date);
        initDate.setUTCHours(initDate.getUTCHours() - initDate.getTimezoneOffset() / 60);
        return initDate.toISOString().substr(0, 16);
    }

    showBasicConfirmButton() {
        return (
            <div className="mt-4 align-self-center d-flex flex-column">
                <div id={"basicConfirmButtonInvalidText"} className={"text-danger mb-2 align-self-center"}/>
                <button id={"basicConfirmButton"} className="btn btn-primary align-self-center" onClick={this.basicConfirmButtonClick}>
                    <span id={"basicConfirmButtonText"} className="text">Activate tag</span>
                </button>
            </div>
        );
    }

    render() {
        return (
            <CardBasicTitle title={"Activate basic tag"}>
                <div className={"d-flex flex-column"}>
                    {this.showRecentTags()}
                    {this.manualTag()}
                    {this.showDatetime()}
                    {this.showBasicConfirmButton()}
                    {this.activationResults()}
                </div>
            </CardBasicTitle>
        )
    }

}


export default ActivateBasicTag;
