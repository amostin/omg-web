import React, { useState} from 'react';
import {putOneTag} from "../../services/omgServer";

export default function ConfirmEachButton(props){
    const [tagName] = useState(props.tagName);
    const [tagDatetime] = useState(props.tagDatetime);
    const [tagId] = useState(props.tagId);

    function applyChanges() {
        console.log(tagName);
        putOneTag(tagName, tagId, new Date(tagDatetime).toISOString()).then((res) => {
            console.log("tag confirmé");
            window.location.reload(true);
        })
    }

    return (
        <div className="align-self-center d-flex flex-column">
            <button id={"showConfirmEachButton"} className="btn btn-primary " onClick={applyChanges}>
                <span id={"showConfirmEachButtonText"} className="text">Confirm it!</span>
            </button>
        </div>
    );
}
