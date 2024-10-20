## Dashboard with Theming & Testing

![Screenshot 2024-10-20 at 4 33 59 PM](https://github.com/user-attachments/assets/074d67a4-3ffa-4895-bdd5-5b6115b77341)

- React (using Typescript) with Next.js
- Testing: React Testing Library and Jest
- API: [Polygon.io API](https://polygon.io/docs/stocks/getting-started)

## Stock Dashboard

Users can create multiple portfiolos and track stocks within them. The web app is built with React (Next.js) and uses the Polygon.io API to retrieve stock data, including company details, most recent price, and previous close price.

![Screenshot 2024-10-20 at 4 40 44 PM](https://github.com/user-attachments/assets/8e86b6d3-400e-4a8b-98e0-432884c7d51e)


## Who This Project is for

This is simplified project that's intended to be used as boilerplate.

- Foundation for building components with hooks, including examples light-weight UI components
- Testing best practices, with examples of unit testing and component testing to ensure code reliability
- Demonstration of using Material UI and creating custom theming for finer control
- Best UX practices, including when and where to display error messaging

### Product Features
#### Create a portfolio
Users can create one or more stock portfolios and give each a unique name. If the portfolio name has been taken users will see a message to choose another name. 

### Add Stock
Users can add stocks to each portfolio by entering the stock ticker symbol. When the stock is successfully added it will show:
- Organization name
- Today's price change
- Most recent price
- Yesterday's close price
- Lowest and highest price for the day

The same stock can be added to one or more portfolios.

![Screenshot 2024-10-20 at 5 00 37 PM](https://github.com/user-attachments/assets/833806e7-a53e-405e-b562-17638d527328)


Users will see a message if the stock data can't be retrieved because the stock can't be found, account is missing permissions, or other general errors.

<img width="400" src="https://github.com/user-attachments/assets/7a051fc7-6a0c-4b42-a9de-0626172b5814"> <img width="400" src="https://github.com/user-attachments/assets/db20b5b3-a591-48de-8230-fce6b68ee30d">


### Remove Stock
Users can remove the stock from the portfolio. If the stock has been added to more than one portfolio, the stock will only be removed from the selected portfolio. 

## Set Up Development Environment

### Setup

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Create an `.env.local` file with key `NEXT_PUBLIC_POLYGON_API_KEY`. Please add a key that has a `Starter` and above plan for the features to work correctly. Please visit [Polygon](https://polygon.io/pricing) for more information about subscription plans.

### Run Tests

```bash
# Run tests once
npm run test

# Run tests and hot-reload when files change
npm run test:watch
```

## Upcoming Features

This project lays the foundation for React projects and I'd like to extend the project to include additional types of testing, as well create backend.

### Additional testing
- Visual regression tests to detect unwanted changes to the visual appearance of components or pages

### Backend
- Set up PostgreSQL and CRUD routes to store users' selections
- Include examples of trigger functions



