## Stock Dashboard

Users can create multiple portfiolos and track stocks within them. The web app is built with React (Next.js) and uses the Polygon.io API to retrieve stock data, including company details, most recent price, and previous close price.



### Features
#### Create a portfolio
Users can create one or more stock portfolios and give each a unique name. If the portfolio name has been taken users will see a message to choose another name. 

<img width="900" alt="Screenshot 2024-09-20 at 4 05 02 PM" src="https://github.com/user-attachments/assets/a32f2be1-5e1a-4c41-baad-ebae84a91406">

### Add Stock
Users can add stocks to each portfolio by entering the stock ticker symbol. When the stock is successfully added it will show:
- Organization name
- Today's price change
- Most recent price
- Yesterday's close price
- Lowest and highest price for the day

The same stock can be added to one or more portfolios.

<img width="1715" alt="Screenshot 2024-09-20 at 4 14 37 PM" src="https://github.com/user-attachments/assets/9d8e152b-9744-44fd-a47a-348bfd23b031">

Users will see a message if the stock data can't be retrieved because the stock can't be found, account is missing permissions, or other general errors.

![Screenshot 2024-09-20 at 4 19 52 PM](https://github.com/user-attachments/assets/10e7918b-dd5f-4875-bb6f-4918b9484fac)


![Screenshot 2024-09-20 at 4 20 11 PM](https://github.com/user-attachments/assets/50c2741b-2bc9-4c1a-8d45-1f1674a2d2bf)


### Remove Stock
Users can remove the stock from the portfolio. If the stock has been added to more than one portfolio, the stock will only be removed from the selected portfolio. 

## Getting Started

### Tech Stack
- React (using Typescript) with Next.js
- API: [Polygon.io API](https://polygon.io/docs/stocks/getting-started)

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

## Future Features
### Portfolio Management
- Rename portfolio
- Delete portfolio and all stored stocks
- Merge portfolios

### Stock Search
- Fuzzy search for stocks
- Filter stock search

### Layout
- Reorder stocks in portfolio
- Reorder portfolio in dashboard



