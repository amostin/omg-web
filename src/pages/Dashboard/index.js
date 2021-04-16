import React, {Component} from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';

import CardInfo from '../../components/Cards/Info';
import ChartDonut from '../../components/Charts/Donut';
import ChartLineExample from '../../components/Charts/Line';
import PageHeading from '../../components/PageHeading';

class Dashboard extends Component {
    componentWillMount() {
        document.getElementById('body').className = 'page-top'
    }

    render() {
        return (
            <div className="container-fluid">

                {/* <!-- Page Heading --> */}

                <PageHeading title="Dashboard"/>

                {/* <!-- Content Row --> */}
                <div className="row">
                    <CardInfo title="Earnings (Monthly)"
                              icon="calendar"
                              color="primary"
                              value="$40,000"/>

                    <CardInfo title="Earnings (Annual)"
                              icon="calendar"
                              color="success"
                              value="215,000"/>

                    <CardInfo title="Tasks"
                              icon="clipboard"
                              color="info"
                              value="50%"/>

                    <CardInfo title="Pending Requests"
                              icon="comments"
                              color="warning"
                              value="18"/>
                </div>
                <div className="row">
                    <div className="col-xl-8 col-lg-6">
                        <ChartLineExample/>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                        <ChartDonut/>
                    </div>

                </div>

            </div>
        )
    }
}

export default Dashboard;
