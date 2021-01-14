import "./pro4";
import React from "react";
import ReactDOM from "react-dom";
import DataTable from "./DataTable";
import Graph from './Graph';
import Map from "./MapData";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

ReactDOM.render(
	<React.StrictMode>
		<Graph />
		<DataTable />
		<Map />
	</React.StrictMode>,
	document.getElementById("root")
);
