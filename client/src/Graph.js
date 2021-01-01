import React, { useState, useEffect } from "react";
import { callApi } from "./utils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { API_EVENTS_HOURLY_URL } from "./config";

const returnChartOptions = ({ chartData }) => ({
	chart: {
		type: "area",
	},
	title: {
		text: "general chart visualizations",
	},
	xAxis: {
		allowDecimals: false,
		title: {
			text: "Hours Data",
		},
	},
	yAxis: {
		title: {
			text: "Events Data",
		},
	},
	plotOptions: {
		area: {
			marker: {
				enabled: false,
				symbol: "circle",
				radius: 2,
				states: {
					hover: {
						enabled: true,
					},
				},
			},
		},
	},
	series: [
		{
			name: "Hours",
			data: chartData.h,
		},

		{
			name: "Events",
			data: chartData.e,
		},
	],
});

const MapData = () => {
	const [loading, setLoader] = useState(true);
	const [chartData, setChartData] = useState();

	useEffect(() => {
		callApi(API_EVENTS_HOURLY_URL)
			.then((resp) => {
				const hourData = resp.map((e) => e.hour);
				const eventsData = resp.map((e) => e.events);
				const DatObj = {
					h: hourData,
					e: eventsData,
				};
				//console.log(DatObj);
				setChartData(DatObj);
				setLoader(false);
			})
			.catch((err) => {
				console.error("Error occured", err);
			});
	}, []);

	if (loading) return <center>Loading...</center>;
	return (
		<div>
			<HighchartsReact
				highcharts={Highcharts}
				options={returnChartOptions({ chartData })}
			/>
		</div>
	);
};

export default MapData;
