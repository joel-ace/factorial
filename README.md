# Metric
This repository contains backend and frontend implementation for the metric application test. These include:

# Project Structure
This project contains two main directories (client and server).

### Backend
  * [`server`](server)
### Frontend
  * [`client`](client)

# Requirements
This project requires the following technologies
- **[NodeJS](https://nodejs.org/)** -  `>= v16.10.0`

# Setting up
- Install [NodeJs](https://nodejs.org/en/)
- Clone the repository 
```bash
git clone https://github.com/joel-ace/factorial.git
```
- Change into factorial directory 
```bash
cd factorial
```
- Install all required dependencies with 
```bash
npm run install-dependencies
```
- Update rename `.env.sample` to `.env` and update environment variables

# Running the roject
To run the file, from inside the factorial directory run
```bash
npm run start:dev
```
This will start both the Frontend and Backend Servers. You can access the frontend in the browser on [http://localhost:3000](http://localhost:3000) and interact with the API on [http://localhost:3030/api](http://localhost:3030/api)

# Testing
From the project directory, you can tests for the server or client using:
```bash
npm run test-server
```
```bash
npm run test-client
```

Alternatively, you can change into the client and server directories and run 
```bash
npm test
```

# API Endpoints
| Endpont               | Functionality                                   |                  |
| :---                  | :----                                           | :----  |
| POST /metrics         | adds a new metric                               | `req.body = { name: string, value: number }` |
| GET /metrics          | gets a paginated list of metrics                | `req.query = { page?: number, limit?: number, name?: string }` |
| GET /metrics-names    | gets all distinct metric names                  |
| GET /average/{name}    | get average values of a particular metric name | `req.params = { name: string }` |