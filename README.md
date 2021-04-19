# Covid 19 Database


## How to run this locally?

Make sure to have `node.js` installed on your computer and clone this repo using `git clone https://github.com/LaraMo/COMP353X.git`

Create a .env file with the following content inside of `/serverv2` and replace the values within <> with your own
(to get the the server folder `cd serverv2`)
```.env 
SSH_HOST=login.encs.concordia.ca
SSH_USER=<your encs username>
SSH_PASS=<your encs password>

DB_HOST=xdc353.encs.concordia.ca,
DB_USER=xdc353_4,
DB_PASS=COMP353X,
DB_DATABASE=xdc353_4
```

when this is done `cd ..` to go back to the root folder


### run the client

```bash
cd client #from the root folder to the client
ls #make sure that package.json is in this folder
npm install #to install the needed dependencies
npm run start #to start the project
```

```python
will be running on localhost:3000
```

### run the server

```bash
cd severv2 #from the root folder to the serverv2
ls #make sure that package.json is in this folder
npm install #to install the needed dependencies
npm run start #to start the project
```

```python
will be running on localhost:3001
```

## Usage

There are 17 pages in the project.
Each query corresponds to a page (/1 for example is Question 1 on the project)

