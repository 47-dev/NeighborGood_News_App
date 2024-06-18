
Project Title: Top Course Filtering with React
Project Overview
The "Top Course Filtering with React" project is a dynamic and responsive web application designed to showcase and filter top news articles based on various categories. Built with React, this application fetches data from an external API and displays it in a user-friendly manner, allowing users to navigate through different news categories and view detailed information about each article. The project is deployed on Vercel for easy access and sharing.

Features
Dynamic Filtering: Users can filter news articles by categories such as technology, sports, health, and more.
Pagination: Navigate through pages of articles with ease using next and previous buttons.
Article Detail View: Click on any article card to view its detailed information, including the full content and related media.
Responsive Design: The application is fully responsive, ensuring a seamless experience on both desktop and mobile devices.
Loading Spinner: Displays a loading spinner while fetching data from the API.
Error Handling: Displays error messages in case of network issues or invalid API responses.
Technologies Used
React: JavaScript library for building user interfaces.
React Router: Library for routing in React applications.
Tailwind CSS: Utility-first CSS framework for styling.
React Toastify: Library for providing notifications and alerts.
Vercel: Platform for deploying and hosting web applications.
Setup and Installation
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/top-course-filtering-with-react.git
cd top-course-filtering-with-react
Install dependencies:

sh
Copy code
npm install
Set up the environment variables:

Create a .env file in the root directory.
Add your NewsAPI key to the .env file:
sh
Copy code
REACT_APP_API_KEY=your_api_key_here
Start the development server:

sh
Copy code
npm start
Deploy to Vercel:

Follow Vercel's documentation to deploy your project.
Project Structure
src/
components/
Navbar.js: Navigation bar component.
Cards.js: Component to display a list of news cards with pagination.
Card.js: Component to display individual news article cards.
ArticleDetail.js: Component to display detailed information about a selected article.
Filter.js: Component for category filtering.
Spinner.js: Component for displaying a loading spinner.
data/
data.js: Contains static data for categories and the API URL.
App.js: Main application component.
Usage
Filtering Articles: Select a category from the filter menu to view articles related to that category.
Pagination: Use the next and previous buttons to navigate through pages of articles.
Detailed View: Click on any article card to view its detailed information in a new page.
Troubleshooting
No News Available: Ensure your API key is valid and correctly set in the .env file. Check the browser console for any error messages.
Environment Variables Not Working: Make sure to restart the development server after setting up the .env file.
Contributions
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
