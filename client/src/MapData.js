import React, { useState, useEffect } from "react";
import { callApi } from "./utils";
import Highcharts from "highcharts";
import HCMap from "highcharts/modules/map";
import HighchartsReact from "highcharts-react-official";
import { mapm } from "./country";
import proj4 from "proj4";
import { API_MAP_URL } from "./config";

window.proj4 = proj4;

HCMap(Highcharts);

const returnChartOptions = ({ chartData }) => ({
	chart: {
		map: mapm,
	},

	title: {
		text: "client-side geo visualizations",
	},

	mapNavigation: {
		enabled: true,
	},

	series: [
		{
			name: "Basemap",
			borderColor: "#A0A0A0",
			nullColor: "rgba(200, 200, 200, 0.3)",
			showInLegend: false,
		},
		{
			name: "Separators",
			type: "mapline",
			nullColor: "#707070",
			showInLegend: false,
			enableMouseTracking: false,
		},
		{
			type: "mappoint",
			name: "Cities",
			data: chartData,
		},
	],
});

const MapData = () => {
	const [loading, setLoader] = useState(true);
	const [chartData, setChartData] = useState();

	useEffect(() => {
		callApi(API_MAP_URL)
			.then((resp) => {
				setChartData(resp);
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
				constructorType={"mapChart"}
				options={returnChartOptions({ chartData })}
			/>
		</div>
	);
};

export default MapData;
