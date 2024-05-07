This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started 

# Pre-requisits: 
- Make sure to have [nvm](https://github.com/nvm-sh/nvm) installed
- Make sure you have npm or yarn installed
- open a new terminal and at the root of the project
- run `nvm use` to use the needed node version. It should prompt you to install the needed node version if it hasn't been installed locally

# Running the app in Development

- Run the development server: the app will run against the dev env configs

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.


# Running the app in Production Build

You firstly need to make a production build 

```bash
npm run build
```

then you can run the build locally

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in a production built environment.
