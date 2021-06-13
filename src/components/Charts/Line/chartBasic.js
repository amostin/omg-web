import React, {Component} from 'react';
import Chart from "chart.js";

import {getChartDataFromTagName} from "../../../services/omgServer";

Chart.defaults.global.defaultFontFamily = 'Nunito';
Chart.defaults.global.defaultFontColor = '#858796';

/**
 *  displays a chart based on the selected tag and user data
 *  @props tagSelected
 */
class ChartBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagSelected: this.props.tagSelected,
            loadingData: true,
            myChart: '',
            config: {   // chart configuration
                type: 'line',
                data: {},
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            time: {
                                unit: 'date'
                            },
                            ticks: {
                                maxTicksLimit: 20,
                                padding: 10,
                            },
                        }],
                        yAxes: [{
                            ticks: {
                                maxTicksLimit: 10,
                                paddings: 10
                            },
                        }],
                    },
                    legend: {
                        display: true,
                        position: "top"
                    },
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        titleMarginBottom: 10,
                        titleFontColor: '#6e707e',
                        titleFontSize: 14,
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        intersect: false,
                        mode: 'index',
                        caretPadding: 10
                    }
                }
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.tagSelected !== prevProps.tagSelected) {
            this.changeTagSelected(this.props.tagSelected).then(() => { // update chart when the selected Tag change
                this.getChartData().then(() => {
                    this.state.myChart.update();
                });
            });

        }
    }

    changeTagSelected = async (data) => {
        this.setState({tagSelected: data})
    }

    changeConfig = (data) => {
        this.setState({config: data})
    }

    changeMyChart = (data) => {
        this.setState({myChart: data})
    }

    /**
     * retrieves the user's data according to the selected tag and loads the data into the chart
     *
     * @return {Promise<void>}
     */
    async getChartData() {
        this.setState({'loadingData': true});
        const paletteDark = ["#dc414b", "#307aac", "#18a060", "#8e4e88", "#f26542", "#36a8dd", "#36cb83", "#bb5888", "#f69e46", "#8d8162"]
        const palette = ["#E15B64", "#3688BF", "#1BB16B", "#9E5797", "#F47E60", "#51B4E1", "#4DD191", "#C46E98", "#F8B26A", "#9B8F6F"];
        // const paletteLight = ["#eb9096", "#72afd7", "#4ae49c", "#bf8bba", "#f8a894", "#88cceb", "#86e0b4", "#d79db9", "#fac998", "#bbb39d"];
        let showData = {};
        await getChartDataFromTagName(this.state.tagSelected).then((data) => {
            console.log(data.chartData);
            showData['labels'] = data['chartData'].map((arr) => arr[0]);
            showData['datasets'] = []
            for (let i = 0; i < Object.keys(data['datasetsLabel']).length; i++) {
                showData['datasets'].push(
                    {
                        label: new Date(data['datasetsLabel'][i]).toLocaleString('fr-BE', {hour:'2-digit', minute:'2-digit', second:'2-digit', day:'numeric', month:'short', year:'numeric'}),
                        lineTension: 0.3,
                        borderColor: palette[i],
                        borderWidth: 1,
                        pointRadius: 3,
                        fill: false,
                        pointBackgroundColor: palette[i],
                        pointBorderColor: palette[i],
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: paletteDark[i],
                        pointHoverBorderColor: paletteDark[i],
                        pointHoverBorderWidth: 5,
                        pointHitRadius: 5,
                        pointBorderWidth: 2,
                        spanGaps: true,
                        data: data['chartData'].map((arr) => arr[1][i])
                    }
                )
            }
            let newConfig = this.state.config;
            newConfig.data = showData;
            this.changeConfig(newConfig);
            this.setState({'loadingData': false});
        })
    }

    async componentDidMount() {
        await this.getChartData();
        this.changeMyChart(new Chart(document.getElementById('myAreaChart').getContext("2d"), this.state.config));
    }

    render() {
        return (
            <div className="chart-area d-flex justify-content-center">
                <canvas className="img-fluid h-100 w-100" id="myAreaChart"/>
            </div>
        )
    }
}

export default ChartBasic;
