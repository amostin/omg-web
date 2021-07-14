import React, {Component} from 'react';
import ActivateBasicTag from "./ActivateBasicTag";

class TagActivation extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className={"d-flex align-items-center justify-content-center"}>
                    <ActivateBasicTag/>
                </div>
            </div>
        );
    }
}

export default TagActivation;
