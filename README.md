# Herolo Home Assignment
### Submitted by Ori Perelman
Check it out [live](https://herolo-weather-ori-perelman.netlify.app).

## Tech Stack
- Typescript
- React (CRA)
- Redux (react-redux)
- React Router
- MUI
- Styled Components
- AccuWeather APIs

## Run Locally
````bash
git clone https://github.com/OPerel/ori-perelman-01-11-2021.git
npm install
npm run start
````

### Using mock data
By default, the app makes actual requests to AccuWeather's API.
In order to change this go to [`fetchUtil.ts`](./src/utils/fetchUtil.ts) and comment out the block starting at line 58,
and un-comment the block starting at line 32.
To simulate an error you can un-comment line 53. 