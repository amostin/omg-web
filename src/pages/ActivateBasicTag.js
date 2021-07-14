import React, {Component} from 'react';
import CardBasicTitle from "../components/Cards/CardBasicTitle";
import {getRecentTags} from "../services/omgServer";

class ActivateBasicTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recentTags: []
        }
    }

    componentDidMount() {
        getRecentTags().then((res) => {
            if (res) {
                this.setState({recentTags: res});
            } else {
                // this.toSignIn('').then(() => {});
                console.log(res);
            }
        });
    }

    /**
     * Displays recent tags
     *
     * @return {JSX.Element}
     */
    showRecentTags = () => {
        if (this.state.recentTags.length > 0) {
            return (
                <div>
                    <p className={"mt-2 mb-0 text-uppercase"}>Recent tags</p>
                    <div className={"d-inline-flex flex-wrap btn-group-toggle"} data-toggle={"buttons"}>
                        {
                            this.state.recentTags.map((tag) => (
                                <label id={tag} className={"btn btn-outline-primary mt-2 ml-1 mr-1"}>
                                    <input type="radio" name="recentTagsButtons" id={"recentTagsBtn" + tag} value={tag}/> {tag}
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
            <div>
                <p className={"mt-4 mb-2 text-uppercase"}>Manual</p>
                <input className={"form-control form-control-plaintext border pl-2 border-bottom-primary"} placeholder={"Enter a tag"}/>
            </div>
        );
    }

    showDatetime() {
        return (
            <div>
                <p className={"mt-4 mb-2 text-uppercase"}>Datetime</p>
            </div>
        );
    }

    render() {
        return (
            <CardBasicTitle title={"Activate basic tag"}>
                {this.showRecentTags()}
                {this.manualTag()}
                {this.showDatetime()}
            </CardBasicTitle>
        )
    }

}

export default ActivateBasicTag;
