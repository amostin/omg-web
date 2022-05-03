import React, {useState} from 'react';

export default function CardExample(props) {
    const [isPendingTag] = useState(props.isPendingTag);
    const [isHistory] = useState(props.isHistoryTag);

    function chooseWhatToShow(){
        if(isPendingTag){
            return (
                <div className={"font-weight-bold small"}>
                    <u>Confirm button</u>
                </div>
            );
        }
        if(isHistory){
            return (
                <div className={"font-weight-bold text-lg"}>
                    <u>Creation date</u>
                </div>
            );
        }
    }

    const cardExample =  (
        <div className="card-header collapsed ">
            <div className={"d-flex justify-content-between"}>
                <div className={"font-weight-bold text-lg"}>
                    <u>Event name</u>
                </div>
                {chooseWhatToShow()}
            </div>
            <div className={"font-weight-bold text-lg text-center"}>
                <u>Event date</u>
            </div>
        </div>
    );
    return cardExample;
}
