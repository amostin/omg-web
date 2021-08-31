import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {getCountAllActivations, getTagsHistory} from "../services/omgServer";
import CardMobile from "../components/Cards/CardMobile";
import EditTagActivationDialog from "../components/Dialogs/EditTagActivationDialog";
import DeleteTagActivationDialog from "../components/Dialogs/DeleteTagActivationDialog";

class TagsHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: Array.from({length: 20}),
            tagsHistory: this.loadTags(new Date(Date.now()).toISOString()),
            tagHistoryCount: null  // Number of tags activation for one user
        }
    }

    componentDidMount() {
        getCountAllActivations().then((res) => this.setState({tagsHistoryCount: res}));
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.tagsHistory !== prevState.tagsHistory) {
    //         console.log(this.state.tagsHistory);
    //     }
    //     if (this.state.tagsHistoryCount !== prevState.tagsHistoryCount) {
    //         console.log(this.state.tagsHistoryCount);
    //     }
    // }

    loadTags = (datetime) => {
        let datetimeBegin = datetime ? datetime : this.state.tagsHistory[this.state.tagsHistory.length - 1]["updatedAt"];
        getTagsHistory(datetimeBegin).then((data) => {
            if (this.state.tagsHistory) {
                this.setState({tagsHistory: this.state.tagsHistory.concat(data)})
            } else {
                this.setState({tagsHistory: data})
            }
        });
    }

    buttonDeleteClick = () => {

    }

    setInfiniteScrollContent() {
        let message = (<div>Loading...</div>)
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

    render() {
        return (
            <div className="container-fluid">
                <div>
                    {this.setInfiniteScrollComponent()}
                </div>
            </div>
        )
    }
}

export default TagsHistory;
