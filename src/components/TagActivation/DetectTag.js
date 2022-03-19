import React, {Component} from 'react';
import CardBasicTitle from "../Cards/CardBasicTitle";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";


class DetectTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dtrp: null,
            testset: ["Tue Mar 10 2022 07:00:00 GMT+0100 (heure normale d’Europe centrale)", "Tue Mar 10 2022 08:00:00 GMT+0100 (heure normale d’Europe centrale)"],
        };
    }



    render() {
        return(
            <CardBasicTitle title={"Detect an event"}>
                <div className={"d-flex flex-column"}>
                    <div className="d-flex align-items-center flex-column justify-content-center">
                        <DateTimeRangePicker
                            onChange={value => this.setState({dtrp: value})}
                            // onChange={value => console.log(value)}
                            // [Wed Mar 16 2022 00:00:00 GMT+0100 (heure normale d’Europe centrale), Fri Mar 18 2022 23:59:59 GMT+0100 (heure normale d’Europe centrale)]

                            value={this.state.dtrp ? this.state.dtrp : this.state.testset}
                        />
                    </div>
                </div>
            </CardBasicTitle>
        )
    }
}

export default DetectTag;
