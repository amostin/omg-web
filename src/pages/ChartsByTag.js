import React, {Component} from 'react';
import {getAllTagsFromUserId} from "../services/omgServer";
import PageHeading from "../components/Titles/PageHeading";
import ChartBasic from "../components/Charts/Line/chartBasic";
import CardBasic from "../components/Cards/CardBasic";

/**
 * "web page" ChartsByTag. Displays a graph according to the chosen tag
 */
class ChartsByTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],   // stores user tags for displaying
            tagSelected: 'none',    // stores the chosen tag
            loadingTags: true
        };
    }

    /**
     * get the user's tags when loading the component
     */
    componentDidMount() {
        getAllTagsFromUserId().then((data) => {
            try {
                data.unshift('none');
                this.setState({'tags': data});
                this.setState({'loadingTags': false});
            } catch (e) {
                console.log("error while try to retrieve tags : " + e);
            }
        });
    }

    tagChange = (event) => {
        this.setState({'tagSelected': event.target.value});
    }

    /**
     * This function loads user's tags in the selector and returns it
     * @return {JSX.Element}
     */
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

    /**
     * Displays the chart as soon as a tag has been selected
     *
     * @return {JSX.Element}
     */
    renderChart() {
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
                    {this.renderChart()}
                </div>
            </div>
        )
    }
}

export default ChartsByTag;
