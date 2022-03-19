import React, {Component} from 'react';
import ActivateBasicTag from "../components/TagActivation/ActivateBasicTag";
import DetectTag from "../components/TagActivation/DetectTag";


class TagActivation extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className={"d-flex flex-column w-100"}>
                    {/*<DetectTag/>*/}
                    <ActivateBasicTag/>
                </div>
            </div>
        );
    }
}

export default TagActivation;
