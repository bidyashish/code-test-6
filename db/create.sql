-- public.hourly_events definition

-- Drop table

-- DROP TABLE public.hourly_events;

CREATE TABLE public.hourly_events (
	"date" date NOT NULL,
	"hour" int4 NOT NULL,
	events int4 NULL,
	poi_id int4 NULL,
	CONSTRAINT hourly_events_pkey PRIMARY KEY (date, hour)
);
CREATE INDEX hourly_events_date_hour_poi_id_index ON public.hourly_events USING btree (date, hour, poi_id);



-- public.hourly_stats definition

-- Drop table

-- DROP TABLE public.hourly_stats;

CREATE TABLE public.hourly_stats (
	"date" date NOT NULL,
	"hour" int4 NOT NULL,
	impressions int4 NOT NULL DEFAULT 0,
	clicks int4 NOT NULL DEFAULT 0,
	revenue numeric(19, 13) NOT NULL DEFAULT 0.0,
	poi_id int4 NULL,
	CONSTRAINT hourly_stats_pkey PRIMARY KEY (date, hour)
);
CREATE INDEX hourly_stats_date_hour_poi_id_index ON public.hourly_stats USING btree (date, hour, poi_id);



-- public.poi definition

-- Drop table

-- DROP TABLE public.poi;

CREATE TABLE public.poi (
	poi_id serial4 NOT NULL,
	"name" text NOT NULL,
	lat float8 NOT NULL,
	lon float8 NOT NULL,
	CONSTRAINT poi_pkey PRIMARY KEY (poi_id)
);
CREATE INDEX poi_poi_id_index ON public.poi USING btree (poi_id);