--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: beigeh0ney
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(255) NOT NULL,
    favorite_city character varying(255),
    email character varying(255)
);


ALTER TABLE public.users OWNER TO beigeh0ney;

--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: beigeh0ney
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO beigeh0ney;

--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beigeh0ney
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: beigeh0ney
--

COPY public.users (userid, username, favorite_city, email) FROM stdin;
3       Maria   New York City   maria@gmail.com
2       Kevin   Houston kevin@gmail.com
1       Steph   San Francisco   steph@gmail.com
\.


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: beigeh0ney
--

SELECT pg_catalog.setval('public.users_userid_seq', 20, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

