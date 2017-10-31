## Time-Tracking-App Backend
**REST** **Api** Backend, written in node.js and express.js 4.0 **to track tasks**.

## Motivation
This project is part one of an university course about advanced webdevelopment. 
We should learn about one-site-web-applications and get introduced by the advantages of
a so called _**one language to bind them all**_ approach :).

## Used Technologies
##### Framework:
- express.js  

##### NoSQL Database:
- MongoDB

##### Additional NPM Modules:
- config
- mongoose  
- mongoose-auto-increment  
- mongoose-csv

## Installation
Run a **MongoDB** server, install **node.js** and **n**ode **p**acket-**m**anager.
##### Project Setup
- clone project by `git clone https://github.com/algore87/pr1_time-tracking-app.git`
- switch to directory by `cd pr1_time-tracking-app`
- install dependencies by `npm update`
- change `mongodb://ip:port/db` in `./config/default.json` to match your database configuration

##### Start Server
- run ./bin/www.js by `npm start`
- host url: `http://localhost:3000/`

## Test
Load data and test the API with **POSTMAN** by importing the following collections which are located in...
```
└── test/
    ├── Data.postman_collection.json
    └── Tests.postman_collection.json
```
Run requests to import data and run the test requests.
## Schema
Field | Type
----- | ----
title | String
description | String
active | Boolean
type | String [enum]
created_at | Date
started_at | Date
stopped_at | Date

## API Reference
HTTP Verb | Route | Description
----- | ------------ | -----------
**GET** | `/api/tasks` | Get a list of all tasks
**POST** | `/api/tasks` | Create a new task
**GET** | `/api/tasks/<id>` | Get specific task with `<id>`
**PUT** | `/api/tasks/<id>` | Update a specific task with `<id>`
**DELETE** | `/api/tasks/<id>` | Delete a specific task with `<id>`
## Feature
Download the full list of tasks as `.csv` file by using the following request query.
```
Route: /api/tasks?format=csv
```
## License
The MIT License (MIT)

Copyright (c) 2017 algore87

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
