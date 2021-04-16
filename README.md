# Covid 19 Database

Foobar is a Python library for dealing with word pluralization.

## How to run this locally?

Make sure to have `node.js` installed on your computer

### run the client

```bash
cd client #from the root folder to the client
ls #make sure that package.json is in this folder
npm run start #to start the project
```

```python
will be running on localhost:3000
```

### run the server

```bash
cd severv2 #the root folder to the serverv2
ls #make sure that package.json is in this folder
npm run start #to start the project
```

```python
will be running on localhost:3001
```

## Usage

There are 17 pages in the project.
Each query corresponds to a page (/1 for example is Question 1 on the project)

Here are all the routes:

```javascript
export const home = "/";
export const crudPerson = "/1";
export const crudHealthWorker = "/2";
export const crudFacility = "/3";
export const crudRegion = "/4";
export const crudGroupZone = "/5";
export const crudPHCR = "/6";
export const addAlert = "/7";
export const followUpForm = "/8";
// export const nine = '/9';
// export const ten = '/10';
// export const eleven = '/11';
// export const twelve = '/12';
// export const thirteen = '/13';
// export const foutteen = '/14';
// export const fithteen = '/15';
// export const sixteen = '/16';
// export const seventeen = '/17';
```
