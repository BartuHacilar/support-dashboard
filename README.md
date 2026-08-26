# Support Dashboard

A responsive customer records dashboard built with React and TypeScript. It fetches users from JSONPlaceholder and provides search, company and city filters, column sorting, summary cards, and pagination.

## Setup

This project was developed with Node.js `v22.20.0`.

```bash
git clone https://github.com/BartuHacilar/support-dashboard.git
cd support-dashboard
npm install
```

## Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To create a production build:

```bash
npm run build
```

## Approach

The app keeps its data and dashboard state locally with React hooks. Search and filters are applied before sorting and pagination, so the summary cards always reflect the current result set. On smaller screens the controls stack and the table can scroll horizontally.

## Notes

- The original 10 records from JSONPlaceholder are used with a page size of 5.
- Search is intentionally immediate because the dataset is small.
- With more time, I would add tests for the filtering and sorting logic.
