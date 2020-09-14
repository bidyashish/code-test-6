const express = require("express");
const pg = require("pg");
require('dotenv').config()

/* 
Import Custom rate Limit 
*/
const rateLimit = require("./rateLimit");
const { response } = require("express");

/* 
MAX_ALLOWED_REQUEST is number is imcoming requests

TIMER:  Maximum number of MAX_ALLOWED_REQUEST in a given time frame

In 

*/
const MAX_ALLOWED_REQUEST = 100; // No of Incoming API Requests
const TIMER = 15 * 1000; // In Seconds

const app = express();
// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html
const pool = new pg.Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
	ssl: true
});

/* 
Add  Rate Limit to all API endpoints
*/
app.use(
	rateLimit({
		duration: TIMER,
		limitMsg: "You are rate Limited",
		max: MAX_ALLOWED_REQUEST,
	})
);

const queryHandler = (req, res, next) => {
	console.log( process.env.PGUSER);
	pool
		.query(req.sqlQuery)
		.then((r) => {
			return res.json(r.rows || []);
		})
		.catch(next);
};

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

app.get("/", (req, res) => {
	res.send("Welcome to Rate Limit API 😎 ");
});

app.get("/ping", (req, res) => {
	res.send("Success 😎 ");
});

app.get(
	"/events/hourly",
	(req, res, next) => {
		req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `;
		return next();
	},
	queryHandler
);

app.get(
	"/events/daily",
	(req, res, next) => {
		req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `;
		return next();
	},
	queryHandler
);

app.get(
	"/stats/hourly",
	(req, res, next) => {
		req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `;
		return next();
	},
	queryHandler
);

app.get(
	"/stats/daily",
	(req, res, next) => {
		req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `;
		return next();
	},
	queryHandler
);

app.get(
	"/poi",
	(req, res, next) => {
		req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `;
		return next();
	},
	queryHandler
);

app.listen(process.env.PORT || 5555, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	} else {
		console.log(`Running on ${process.env.PORT || 5555}`);
	}
});

// last resorts
process.on("uncaughtException", (err) => {
	console.log(`Caught exception: ${err}`);
	process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
	console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
	process.exit(1);
});
