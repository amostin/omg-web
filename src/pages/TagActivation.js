import React, {Component} from 'react';
import ActivateBasicTag from "../components/TagActivation/ActivateBasicTag";

class TagActivation extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className={"d-flex"}>
                    <ActivateBasicTag/>
                </div>
            </div>
        );
    }
}

export default TagActivation;
