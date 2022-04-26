import React, {Component} from 'react';
import {getPendingTags, getTagsHistory, getTagsHistoryByActivationTime} from "../services/omgServer";
import CardMobile from "../components/Cards/CardMobile";
import {useFormatStringForId} from "../hooks/useFormatStringForId";
import EditTagActivationDialog from "../components/Dialogs/EditTagActivationDialog";
import DeleteTagActivationDialog from "../components/Dialogs/DeleteTagActivationDialog";

class PendingTags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendingTags: "",
        }
    }

    componentDidMount() {
        getPendingTags().then((pendingTags) => {
            this.setState({pendingTags: pendingTags});
            console.log(this.state.pendingTags);
        });
    }

    showEachPendingTag(){
        let pendingTagCards = (<div>Loading...</div>)
        // this.state.tagsHistory.map((tag) => (console.log(tag)));
        if (this.state.pendingTags) {
            pendingTagCards = this.state.pendingTags.map((pendingTag) => (
                <div key={"containerPendingTagsCard" + useFormatStringForId(pendingTag.name) + this.state.pendingTags.indexOf(pendingTag)}>
                    <CardMobile>
                        {/* <!-- Card Header - Accordion --> */}
                        <a href={"#pendingTagsCard" + useFormatStringForId(pendingTag.name) + this.state.pendingTags.indexOf(pendingTag)} className="card-header collapsed" data-toggle="collapse" role="button" aria-expanded="true"
                           aria-controls={"pendingTagsCard" + pendingTag.name + this.state.pendingTags.indexOf(pendingTag)}>
                            <div className={"d-flex justify-content-between"}>
                                <div className={"font-weight-bold text-lg text-primary"}>
                                    {pendingTag.name}
                                </div>
                                <div className={"small text-gray-500"}>
                                    {new Date(pendingTag.updatedAt).toLocaleString('fr-BE', { timeZone: 'UTC' })}
                                </div>
                            </div>
                            <div className={"text-lg text-center mt-2 text-gray-700"}>
                                {new Date(pendingTag.startDatetime).toLocaleDateString([], {timeZone: 'UTC', "weekday": "short", 'day': '2-digit', 'month': "short", "year": "numeric", "hour": '2-digit', "minute": "2-digit"})}
                            </div>

                        </a>
                        {/*<!-- Card Content - Collapse -->*/}
                        <div className="collapse" id={"pendingTagsCard" + useFormatStringForId(pendingTag.name) + this.state.pendingTags.indexOf(pendingTag)}>
                            <div className="card-body d-flex justify-content-around">
                                <EditTagActivationDialog tagName={pendingTag.name} tagDatetime={pendingTag.startDatetime} tagId={pendingTag.id}/>
                                <DeleteTagActivationDialog tagId={pendingTag.id}/>
                            </div>
                        </div>
                    </CardMobile>
                </div>
            ));
        }
        return pendingTagCards;
    }

    showCardExample(){
        return (
            <div className="card-header collapsed ">
                <div className={"d-flex justify-content-between"}>
                    <div className={"font-weight-bold text-lg"}>
                        <u>Event name</u>
                    </div>
                    <div className={"font-weight-bold text-lg"}>
                        <u>Creation date</u>
                    </div>
                </div>
                <div className={"font-weight-bold text-lg text-center"}>
                    <u>Event date</u>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <div >
                    <CardMobile>
                        {this.showCardExample()}
                    </CardMobile>
                    {this.showEachPendingTag()}
                </div>
            </div>
        )
    }

}

export default PendingTags;
