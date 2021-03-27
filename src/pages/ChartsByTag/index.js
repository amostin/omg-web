import React, {Component} from 'react';
import {getAllTagsFromUserId} from "../../services/omgServer";
import CardDefault from "../../components/Cards/Default";


class ChartsByTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: "a301cca5-165c-4197-952b-d302343b876a",
            tags: ['repas', 'ptitdej'],
            tagSelected: "",
            loadingTags: true
        };
    }

    componentDidMount() {
        getAllTagsFromUserId(this.state.userId).then((data) => {
            console.log(data);
            this.state.tags = data;
            this.state.loadingTags = false
        });
    }

    tagSelector() {
        return (
            <form className="ml-4 mr-4">
                <div className="row">
                    <label htmlFor="tagsList">Choose a tag :</label>
                    <select className="form-control" id="tagsList">
                        {this.state.tags.map(tag => (<option key={tag} value={tag}>{tag}</option>))}
                    </select>
                </div>
            </form>
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/*<button onClick={() => {this.tagSelector()}}>Click me</button>*/}
                    {this.tagSelector()}
                </div>
            </div>
        )
    }
}

export default ChartsByTag;
