# IDATA2301 Webteknologi - Learniverse Connect

This is our final project for IDATA2301 Webteknologi - a dynamic online course marketplace called Learniverse Connect.

## Project Description

Learniverse Connect is a comprehensive online course marketplace that connects learners with a variety of educational offerings from different providers. The platform offers the following features:

- Course Browsing: Explore courses across different categories
- Filtering & Sorting: Filter courses by category, price, and other criteria
- Shopping Cart: Add courses to cart and complete purchases
- User Authentication: Register, login, and manage your profile
- Course Favorites: Save courses to your favorites list
- Course Comparison: Compare different courses side by side
- Admin Panel: Administrators can manage course visibility

The frontend is built with React, uses React Router for navigation, and communicates with a REST API backend.

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- A running instance of the backend API

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=http://localhost:8080
```

Replace the URL with your backend API URL.

### Installation

1. Clone the repository:

```
git clone https://github.com/Hermzy14/webteknologi
cd webteknologi
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

4. The application will be available at http://localhost:5173 (or another port if 5173 is in use)

## Screenshots

### Landing page

![Header, hero section and category carousel](/screenshots/landing-page-1.png)
![Discounted section landing page and footer](/screenshots/landing-page-2.png)

### Course information page

![Course information page](/screenshots/course-info.png)

### Explore page

![Explore page](/screenshots/explore-page.png)

### Cart page

![Empty cart](/screenshots/empty-cart.png)
![Cart with courses](/screenshots/cart-with-courses.png)

### Compare page

![Empty compare page](/screenshots/empty-compare.png)
![Compare page with courses](/screenshots/compare-page.png)

### About page

![About page hero and about text](/screenshots/about-page-1.png)
![Contact form and other ways to contact](/screenshots/about-page-2.png)

### Login and register pages

![Login page](/screenshots/login.png)
![Register page](/screenshots/register.png)

### Profile page

![Profile page](/screenshots/profile.png)

### Admin page

![Admin page](/screenshots/admin.png)
