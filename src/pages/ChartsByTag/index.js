import React, {Component} from 'react';
import {getAllTagsFromUserId} from "../../services/omgServer";
import PageHeading from "../../components/PageHeading";
import ChartBasic from "../../components/Charts/Line/chartBasic";
import CardBasic from "../../components/Cards/Basic";

class ChartsByTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            tagSelected: 'none',
            loadingTags: true
        };
    }

    componentDidMount() {
        getAllTagsFromUserId().then((data) => {
            try {
                data.unshift('none');
                this.setState({'tags': data});
                this.setState({'loadingTags': false});
            } catch (e) {
                console.log(data);
                console.log("error while try to retrieve tags : " + e);
            }
        });
    }

    tagChange = (event) => {
        this.setState({'tagSelected': event.target.value});
    }

    tagSelector() {
        if (!this.state.loadingTags) {
            return (
                <form>
                    <div className="row">
                        <label htmlFor="tagsList">Choose a tag :</label>
                        <select className="form-control" id="tagsList" onChange={this.tagChange}>
                            {this.state.tags.map(tag => (<option key={tag} value={tag}>{tag}</option>))}
                        </select>
                    </div>
                </form>
            )
        } else {
            return (<p>Loading...</p>)
        }
    }

    renderTag() {
        if (this.state.tagSelected === 'none') {
            return (<p>Select a tag</p>)
        } else {
            return (<CardBasic><ChartBasic tagSelected={this.state.tagSelected}/></CardBasic>)
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <PageHeading title="Tag"/>
                <div className="row align-items-center mb-4 ml-4 mr-4">
                    {this.tagSelector()}
                </div>
                <PageHeading title="Chart"/>
                <div className="row align-items-center mb-4 ml-2 mr-4">
                    {this.renderTag()}
                </div>
            </div>
        )
    }
}

export default ChartsByTag;
