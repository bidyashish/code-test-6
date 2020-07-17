import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { callApi, formatDate } from "./utils";
import { API_STATS_HOUR_URL, API_STATS_DAILY_URL } from "./config";

import "./App.css";

const colHourly = [
	{
		label: "Date",
		field: "date",
		width: 100,
		sort: "disabled",
		attributes: {
			"aria-controls": "DataTable",
			"aria-label": "Name",
		},
	},
	{
		label: "Hours",
		field: "hour",
		width: 60,
	},
	{
		label: "Impressions",
		field: "impressions",
		width: 100,
	},
	{
		label: "Clicks",
		field: "clicks",
		sort: "asc",
		width: 100,
	},
	{
		label: "Revenues",
		field: "revenue",
		sort: "asc",
		width: 100,
	},
];

const colDaily= [
	{
		label: "Date",
		field: "date",
		width: 100,
		sort: "disabled",
		attributes: {
			"aria-controls": "DataTable",
			"aria-label": "Name",
		},
	},
	{
		label: "Impressions",
		field: "impressions",
		width: 100,
	},
	{
		label: "Clicks",
		field: "clicks",
		sort: "asc",
		width: 100,
	},
	{
		label: "Revenues",
		field: "revenue",
		sort: "asc",
		width: 100,
	},
];

export default function App() {
	const [loading, setLoader] = useState(true);
	const [isHourly, setIsHourly] = useState(true);
	const [datatable, setDatatable] = useState({
		columns: [],
		rows: [],
	});

	useEffect(() => {
		callApi(isHourly ? API_STATS_HOUR_URL : API_STATS_DAILY_URL)
			.then((resp) => {
				const newResp = resp.map((val) => {
					const { date, ...others } = val;
					return {
						date: formatDate(date),
						...others,
					};
				});

				setDatatable({ columns: isHourly ? colHourly : colDaily, rows: newResp });
				setLoader(false);
			})
			.catch((err) => {
				console.error("Error occured", err);
			});
	}, [isHourly]);

	const onDataDaily = () => {
		setIsHourly(!isHourly);
    };
    

	if (loading) return <center>Loading...</center>;

	return (
		<div>
			<h4>Data table with Search</h4>
			<button onClick={(e) => onDataDaily(e)}>{isHourly ? "Click for Daily" : "Click for Hourly"}</button>
			<MDBDataTableV5
				hover
				entriesOptions={[5, 20, 25]}
				entries={5}
				pagesAmount={4}
				data={datatable}
			/>{" "}
            <hr />
            <hr />
            <hr />
		</div>
	);
}
