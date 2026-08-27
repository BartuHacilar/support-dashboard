# Support Dashboard

A responsive customer records dashboard built with React and TypeScript. It fetches users from JSONPlaceholder and provides search, filters, sorting, summary cards, and pagination.

## Features

- Search by name or email with a short debounce
- Company and city filters
- Ascending and descending column sorting
- Filter-aware summary cards and pagination
- URL-synced dashboard state
- Responsive light and dark themes
- Loading, empty, and error states
- Keyboard and screen reader support

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

## Checks

```bash
npm test
npm run lint
npm run build
```

## Approach

The app keeps its data and dashboard state locally with React hooks. Search and filters are applied before sorting and pagination, so the summary cards always reflect the current result set. Search, filters, sorting, and page state are also stored in query parameters so a filtered view can be refreshed or shared.

The layout follows the supplied wireframe while using custom colors and spacing. Controls stack on smaller screens, and the table becomes horizontally scrollable below the mobile breakpoint.

## Assumptions and limitations

- The original 10 records are enough to demonstrate pagination with a page size of 5, so no mock data was added.
- Filtering, sorting, and pagination are client-side because the dataset is small.
- The app depends on JSONPlaceholder being available when it first loads.

## Future improvements

- Move search, filtering, sorting, and pagination to the server for a larger dataset.
- Support multi-select filters for comparing several companies or cities at once.
- Add numbered pagination and a page-size selector to make larger result sets easier to navigate.
- Add a retry action to the error state for temporary API failures.
