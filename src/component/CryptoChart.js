import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import { HistoricalChart } from './config'
export default function CryptoChart(props) {

    const id = props.id;
    console.log(id)
    const [days, setDays] = useState(1);
    const [chartData, setChartData] = useState()
    const currency = 'inr';

    //fetching chart data coming form api
    async function fetchChartData() {
        const res = await axios.get(HistoricalChart(id, days, currency))
        console.log(res.data)
        setChartData(res.data.prices);
    }

    //useEffect
    useEffect(() => {
        fetchChartData();
    }, [days])


    return (
        <div>
            <Line
                data={{
                    labels: chartData && chartData.map(item => {
                        let date = new Date(item[0]);
                        let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}: ${date.getMinutes()} AM`;
                        return days == 1 ? time : date.toLocaleDateString();
                    }),
                    datasets: [
                        {
                            label: `Price for Past ${days} days`,
                            borderColor: '#E4A11B',
                            borderWidth: 2,
                            data: chartData && chartData.map(item => item[1])
                        }
                    ]
                }}
                options={{
                    elements: {
                        point: {
                            radius: 1
                        }
                    },
                    title: {
                        display: true,
                        text: 'Historic Data',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
            <div style={{ marginTop: '30px' }} className='text-center'>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button onClick={() => setDays(1)} type="button" class="btn btn-warning">1 DAY</button>
                    <button onClick={() => setDays(30)} type="button" class="btn btn-warning">1 MONTH</button>
                    <button onClick={() => setDays(90)} type="button" class="btn btn-warning">1 QUARTER</button>
                    <button onClick={() => setDays(365)} type="button" class="btn btn-warning">1 YEAR</button>
                </div>
            </div>
        </div>
    )
}
