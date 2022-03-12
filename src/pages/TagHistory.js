import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {getCountAllActivations, getTagsHistory, getTagsHistoryByActivationTime} from "../services/omgServer";
import CardMobile from "../components/Cards/CardMobile";
import EditTagActivationDialog from "../components/Dialogs/EditTagActivationDialog";
import DeleteTagActivationDialog from "../components/Dialogs/DeleteTagActivationDialog";

class TagsHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: Array.from({length: 20}),
            tagsHistory: this.loadTags(new Date(Date.now()).toISOString()),
            sortByActivationTime: true,
            lastDatetime: undefined,
            tagHistoryCount: null  // Number of tags activation for one user
        }
    }

    componentDidMount() {
        getCountAllActivations().then((res) => this.setState({tagHistoryCount: res}));
        // getCountAllActivations().then((res) => console.log(res));

    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.tagsHistory !== prevState.tagsHistory) {
    //         console.log(this.state.tagsHistory);
    //     }
    //     if (this.state.tagsHistoryCount !== prevState.tagsHistoryCount) {
    //         console.log(this.state.tagsHistoryCount);
    //     }
    // }

    loadTags = (datetime, isSorted = true) => {
            let datetimeBegin = datetime ? datetime : this.state.tagsHistory[this.state.tagsHistory.length - 1]["startDatetime"];
            console.log(datetime + '---' + datetimeBegin);
            getTagsHistoryByActivationTime(datetimeBegin).then((data) => {
                if (this.state.tagsHistory) {
                    if(!this.state.lastDatetime){
                        console.log("👍state.tagsHistory:\n" + JSON.stringify(data, null, 1));
                        this.setState({tagsHistory: this.state.tagsHistory.concat(data)})
                    } else {
                        console.log("👎👎!state.tagsHistory:\n" + JSON.stringify(data, null, 1));
                        this.setState({tagsHistory: data});
                        this.setState({lastDatetime: undefined});

                    }
                } else {
                    console.log("👎!state.tagsHistory:\n" + JSON.stringify(data, null, 1));
                    this.setState({tagsHistory: data})
                }
            });
        // }
    }

    loadTagsByCreateDate = (datetime) => {
        let datetimeBegin = datetime ? datetime : this.state.lastDatetime;
        getTagsHistory(datetimeBegin).then((data) => {
            // console.log("QUAND EST CE QUE DATA SE VIDE ??\nc'est parce que tagshistory est jamais vide donc on fait jamais le concat");
            // console.log(this.state.tagsHistory);
            if (!this.state.lastDatetime) {
                this.setState({tagsHistory: data});
                console.log("by created time: \n");
                console.log(this.state.tagsHistory);
                this.setState({lastDatetime: this.state.tagsHistory[this.state.tagsHistory.length - 1]["updatedAt"]});

            } else {
                console.log("by created time (after scroll): \n");
                this.setState({tagsHistory: this.state.tagsHistory.concat(data)});
            }
        });
    }

    buttonSortClick = () => {
        console.log("click");
        this.setState({sortByActivationTime: false}, () => {
            this.loadTagsByCreateDate(new Date(Date.now()).toISOString());
        });
    }

    buttonNewSortClick = () => {
        console.log("new click");
        this.setState({sortByActivationTime: true}, () => {
            this.loadTags(new Date(Date.now()).toISOString());
        });
    }

    showBasicConfirmButton() {
        return (
            <div className="align-self-center d-flex flex-column">
                {/*<div id={"basicConfirmButtonInvalidText"} className={"text-danger mb-2 align-self-center"}/>*/}
                <button id={"basicConfirmButton"} className="btn btn-primary align-self-center" onClick={this.buttonSortClick}>
                    <span id={"basicConfirmButtonText"} className="text">Sort by created time</span>
                </button>
            </div>
        );
    }

    showNewConfirmButton() {
        return (
            <div className="align-self-center d-flex flex-column">
                {/*<div id={"basicConfirmButtonInvalidText"} className={"text-danger mb-2 align-self-center"}/>*/}
                <button id={"basicConfirmButton"} className="btn btn-primary align-self-center" onClick={this.buttonNewSortClick}>
                    <span id={"basicConfirmButtonText"} className="text">Sort by activation time</span>
                </button>
            </div>
        );
    }

    // showCardExampleNextDiv(){
    //     return (
    //         <div className={"text-lg text-center mt-2 text-gray-700"}>
    //             Created at
    //         </div>
    //     );
    // }

    showCardExample(){
        return (
            <div className="card-header collapsed">
                <div className={"d-flex justify-content-between"}>
                    <div className={"font-weight-bold text-lg text-primary"}>
                        Event name
                    </div>
                    <div className={"small text-gray-500"}>
                        Created at
                    </div>
                </div>
                <div className={"text-lg text-center mt-2 text-gray-700"}>
                    Event date and time
                </div>
            </div>
        );
    }

    setInfiniteScrollContent() {
        let message = (<div>Loading...</div>)
        // this.state.tagsHistory.map((tag) => (console.log(tag)));
        if (this.state.tagsHistory) {
            message = this.state.tagsHistory.map((tag) => (
                <div key={"containerTagsHistoryCard" + tag["name"] + this.state.tagsHistory.indexOf(tag)}>
                    <CardMobile>
                        {/* <!-- Card Header - Accordion --> */}
                        <a href={"#tagCard" + tag["name"] + this.state.tagsHistory.indexOf(tag)} className="card-header collapsed" data-toggle="collapse" role="button" aria-expanded="true"
                           aria-controls={"tagCard" + tag["name"] + this.state.tagsHistory.indexOf(tag)}>
                            <div className={"d-flex justify-content-between"}>
                                <div className={"font-weight-bold text-lg text-primary"}>
                                    {tag["name"]}
                                </div>
                                <div className={"small text-gray-500"}>
                                    {new Date(tag["updatedAt"]).toLocaleString()}
                                </div>
                            </div>
                            <div className={"text-lg text-center mt-2 text-gray-700"}>
                                {new Date(tag["startDatetime"]).toLocaleDateString([], {"weekday": "short", 'day': '2-digit', 'month': "short", "year": "numeric", "hour": '2-digit', "minute": "2-digit"})}
                            </div>

                        </a>
                        {/*<!-- Card Content - Collapse -->*/}
                        <div className="collapse" id={"tagCard" + tag["name"] + this.state.tagsHistory.indexOf(tag)}>
                            <div className="card-body d-flex justify-content-around">
                                <EditTagActivationDialog tagName={tag["name"]} tagDatetime={tag["startDatetime"]} tagId={tag["id"]}/>
                                <DeleteTagActivationDialog tagId={tag["id"]}/>
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
        if (this.state.tagHistoryCount) {
            if (this.state.tagHistoryCount <= this.state.tagsHistory.length) {
                ret = false;
            }
        }
        return ret;
    }

    setInfiniteScrollComponent() {
        if (this.state.tagsHistory) {
            return (
                // <div>ok</div>
                <div>
                    {this.showBasicConfirmButton()}
                    <CardMobile>
                        {this.showCardExample()}
                        {/*{this.showCardExampleNextDiv()}*/}
                    </CardMobile>
                    <InfiniteScroll
                        dataLength={this.state.tagsHistory.length}
                        next={this.loadTags}
                        hasMore={this.hasMore()}
                        loader={<p>Loading...</p>}>
                        {this.setInfiniteScrollContent()}
                    </InfiniteScroll>
                    <div className={"mt-3"}/>
                </div>
            );
        } else {
            return (<div>Loading...</div>);
        }
    }

    setSortedInfiniteScrollComponent() {
        if (this.state.tagsHistory) {
            return (
                <div>
                    {this.showNewConfirmButton()}
                    <CardMobile>
                        {this.showCardExample()}
                        {/*{this.showCardExampleNextDiv()}*/}
                    </CardMobile>
                    <InfiniteScroll
                        dataLength={this.state.tagsHistory.length}
                        next={this.loadTagsByCreateDate}
                        hasMore={this.hasMore()}
                        loader={<p>Loading...</p>}>
                        {this.setInfiniteScrollContent()}
                    </InfiniteScroll>
                    <div className={"mt-3"}/>
                </div>
            );
        } else {
            return (<div>Loading...</div>);
        }
    }

    render() {
        const sortByActivationTime = this.state.sortByActivationTime;
        let scrollCompo;
        if (sortByActivationTime) {
            scrollCompo = this.setInfiniteScrollComponent();
        } else {
            scrollCompo = this.setSortedInfiniteScrollComponent();
        }
        return (
            <div className="container-fluid">
                <div sortByActivationTime={sortByActivationTime}>
                    {scrollCompo}
                </div>
            </div>
        )
    }


}

export default TagsHistory;
