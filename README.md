This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started 

# Pre-requisits: 
- Make sure to have [nvm](https://github.com/nvm-sh/nvm) installed
- Make sure you have [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed
- open a new terminal and at the root of the project
- run `nvm use` to use the needed node version. It should prompt you to install the needed node version if it hasn't been installed locally

# Running the app in Development
- Run `npm install` or `yarn` to get the node_modules needed for this app
- Run the development server: the app will run against the dev env configs

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.


# Running the app in Production Build
- If you havent already, Run `npm install` or `yarn` to get the node_modules needed for this app
- You then need to make a production build 

```bash
npm run build
```

- Then you can run the build locally

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in a production built environment.


# Testing with Jest 

The app is configured to run the test files, you can run the test suit by running the following command in your terminal.

* a coverage report should be produced in the terminal once the suite has done running the tests.

```bash
npm run test
```

# App Url 

The app is deployed to Vercel: https://pokemon-list-pied.vercel.app/