import React, {Component} from 'react';
import CardBasicTitle from "../components/Cards/CardBasicTitle";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import CardMobile from "../components/Cards/CardMobile";
import {postBasicTag} from "../services/omgServer";
import EditTagActivationDialog from "../components/Dialogs/EditTagActivationDialog";
import DeleteTagActivationDialog from "../components/Dialogs/DeleteTagActivationDialog";
import InfiniteScroll from "react-infinite-scroll-component";
// import ActivateBasicTag from "../components/TagActivation/ActivateBasicTag";

class TagDetection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenDetectionTag: "",
            fromTime: null,
            toTime: null,
            weekDaysSelected: [],
            rangesHistoryCount: 3,
            // get created range will fill this array
            rangesHistory: [
                {
                    "name": "dej",
                    "fromTime": "07:00",
                    "toTime": "09:00",
                    "daysSelected": [],
                    "id": "e8a8f560-46eb-4b3a-934b-rj45"
                },
                {
                    "name": "diner",
                    "fromTime": "12:00",
                    "toTime": "13:00",
                    "daysSelected": ["mon", "fri"],
                    "id": "e8a8f560-46eb-4b3a-934b-rj45"
                },
                {
                    "name": "souper",
                    "fromTime": "18:00",
                    "toTime": "19:00",
                    "daysSelected": ["sat", "sun"],
                    "id": "e8a8f560-46eb-4b3a-934b-rj45"
                },
            ]
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(JSON.stringify(this.state.rangesHistory));
    }

    detectionTagInputChange = (event) => {
        this.setState({chosenDetectionTag: event.target.value});
        // console.log('input value :\n'+ event.target.value);
        // console.log('state chosenDetectionTag :\n'+ this.state.chosenDetectionTag);
    }

    setFrom = (event) => {
        this.setState({fromTime: event.target.value});
        // console.log('from input :\n'+ event.target.value);
        // console.log('from state :\n'+ this.state.fromTime);
    }

    setTo = (event) => {
        this.setState({toTime: event.target.value});
    }

    weekDaysChange(day) {
        let selected = this.state.weekDaysSelected
        let find = selected.indexOf(day)

        if(find > -1) {
            selected.splice(find, 1);
        } else {
            selected.push(day);
        }
        this.setState({weekDaysSelected: selected});
        console.log(selected);
    }

    basicConfirmButtonClick = () => {
        if (this.state.chosenDetectionTag && this.state.fromTime && this.state.toTime) {
            console.log("loading");
            console.log("format data to post");
            console.log("post name, from, to and optionally days\nthen success or error");
            let newRange = {};
            newRange.name = this.state.chosenDetectionTag;
            newRange["fromTime"] = this.state.fromTime;
            newRange["toTime"] = this.state.toTime;
            newRange["daysSelected"] = this.state.weekDaysSelected;
            this.state.rangesHistoryCount++;
            let rangesHistoryNew = this.state.rangesHistory;
            rangesHistoryNew.unshift(newRange);
            this.setState({rangesHistory: rangesHistoryNew});
            console.log(this.state.rangesHistoryCount);
            console.log(JSON.stringify(newRange));
        } else {
            document.getElementById("basicConfirmButtonInvalidText").innerText = "Tag name and time range required";
        }
    }

    formatStringForId = (str) => {
        // let regex = /[A-Za-z]|[0-9]|\.|\-|\:|\_/gi;
        let regex = /[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\uFFFF]/gu;
        let newStr = str.replaceAll(regex, '');
        return newStr;
    }

    manualTagInput() {
        return (
            <div>
                <input
                    id={"detectionTagInput"}
                    className={"form-control form-control-plaintext border pl-2 border-bottom-primary"}
                    placeholder={"Enter a tag"}
                    onChange={this.detectionTagInputChange}
                />
            </div>
        );
    }

    setDaysCheckboxes () {
        let weekDays = [["Mon", 1], ["Tue", 2], ["Wed", 3], ["Thu",4], ["Fri", 5], ["Sat", 6], ["Sun", 0]];
        let checkboxes = [];
        weekDays.forEach(day => {
            checkboxes.push((
                <div key={"checkboxItem" + day[0] } className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" key={"checkbox" + day[0] } id={"checkbox" + day[0] } value={day[1]} onChange={() => this.weekDaysChange(day[1])}/>
                    <label className="form-check-label" htmlFor={"checkbox" + day[0]}>{day[0]}</label>
                </div>
            ));
        })
        return checkboxes;
    }

    showBasicConfirmButton() {
        return (
            <div className="mt-4 align-self-center d-flex flex-column">
                <div id={"basicConfirmButtonInvalidText"} className={"text-danger mb-2 align-self-center"}/>
                <button id={"basicConfirmButton"} className="btn btn-primary align-self-center" onClick={this.basicConfirmButtonClick}>
                    <span id={"basicConfirmButtonText"} className="text">Create range</span>
                </button>
            </div>
        );
    }

    showDays(days){
        let message = !days.length ? <div>Every day</div> : days.map((day) => (
            <div>{day}</div>
        ));
        return message;
    }

    showCreatedRange(){
        let message = (<CardMobile>No range found</CardMobile>);
        if (this.state.rangesHistory) {
            message = this.state.rangesHistory.map((range) => (
                <div key={"containerRangesHistoryCard" + this.formatStringForId(range["name"]) + this.state.rangesHistory.indexOf(range)}>
                    <CardMobile>
                        {/* <!-- Card Header - Accordion --> */}
                        <a href={"#rangeCard" + this.formatStringForId(range["name"]) + this.state.rangesHistory.indexOf(range)} className="card-header collapsed" data-toggle="collapse" role="button" aria-expanded="true"
                           aria-controls={"rangeCard" + range["name"] + this.state.rangesHistory.indexOf(range)}>
                            <div className={"d-flex justify-content-between"}>
                                <div className={"font-weight-bold text-lg text-primary"}>
                                    {range["name"]}
                                </div>
                                <div className={"text-lg text-center mt-2 text-gray-700"}>
                                    From {range["fromTime"]} to {range["toTime"]}
                                </div>
                                <div className={"text-lg text-center mt-2 text-gray-700"}>
                                    {this.showDays(range["daysSelected"])}
                                </div>
                            </div>
                        </a>
                        {/*<!-- Card Content - Collapse -->*/}
                        <div className="collapse" id={"rangeCard" + this.formatStringForId(range["name"]) + this.state.rangesHistory.indexOf(range)}>
                            <div className="card-body d-flex justify-content-around">
                                <button>future edit</button>
                                <button>future delete</button>
                                {/*<EditrangeActivationDialog rangeName={range["name"]} rangeDatetime={range["startDatetime"]} rangeId={range["id"]}/>*/}
                                {/*<DeleterangeActivationDialog rangeId={range["id"]}/>*/}
                            </div>
                        </div>
                    </CardMobile>
                </div>
            ));
        }
        return message;
    }

    hasMore = () => {
        let ret = true;
        if (this.state.rangesHistoryCount) {
            if (this.state.rangesHistoryCount <= this.state.rangesHistory.length) {
                ret = false;
            }
        }
        return ret;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className={"d-flex flex-column "}>
                    <CardBasicTitle title={"Detection config"}>
                        <div className={"d-flex flex-column"}>
                            <p className={"mt-2 mb-2"}>Create a range name</p>
                            {this.manualTagInput()}
                            <p className={"mt-2 mb-2"}>Select a time range</p>
                            <CardMobile>
                                <div className={"m-2"}>
                                    <label htmlFor="from">From : </label>
                                    <input id="from" type="time" name="from" onChange={this.setFrom}/>
                                    <label htmlFor="to">To : </label>
                                    <input id="to" type="time" name="to" onChange={this.setTo}/>
                                </div>
                                <div>
                                    {this.setDaysCheckboxes()}
                                </div>
                            </CardMobile>
                            {this.showBasicConfirmButton()}
                        </div>
                    </CardBasicTitle>
                    <InfiniteScroll
                        dataLength={this.state.rangesHistory.length}
                        next={this.basicConfirmButtonClick}
                        hasMore={this.hasMore()}
                        loader={<p>Loading...</p>}>
                        {this.showCreatedRange()}
                    </InfiniteScroll>
                    <div className={"m-4"}></div>
                </div>
            </div>
        );
    }
}

export default TagDetection;
