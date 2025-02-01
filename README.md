BharatFd(Assignment for Hirirng backend developer)

Aim - To Store Faqs as a model and dynamically displaying translations using Google Translate Api.

Tech Stack-
Backend: Node.js, Express.js
Database: MongoDB (with Redis for caching)
Frontend: EJS templating
APIs: REST API structure
Caching: Redis

Assumptions-
Backend-Centric: The focus is on backend development.
Simple Authentication: Admin login uses hardcoded credentials.
Minimal UI Framework: Uses EJS for fast rendering.

Installation Guide-
1.Download the zip file .
2.Extract the zip file.
3.Make the current directory to the folder(BharatFd).
4.Run command (npm install) to install all the dependencies for this project.
5.Create a .env file and setup enviorment variables for using MONGO_DB_URL for databse and PROJECT_ID for calling Google Translate API.
6.Run app.js file using command node app.js in order to start the server.
7.Login using email - admin@example.com and password - admin.

Upon login, you’ll be redirected to /api/faqs.


API USE EXAMPLE-
# Fetch FAQs in English (default)
curl http://localhost:8000/api/faqs/ 
(If using Postman or any other tool to call the api this will render ejs template used to make a dashboard to display all the current faqs, 
a form to add more faqs and buttons to select different languages in order to display translations dynamically.

# Fetch FAQs in Hindi
curl http://localhost:8000/api/faqs/?lang=hi

# Fetch FAQs in Bengali
curl http://localhost:8000/api/faqs/?lang=bn

# Fetch  FAQs with Id
curl http://localhost:8000/api/faqs/:faqid






Contribution Guidelines  

Thank you for considering contributing to BharatFD! Please follow these guidelines for a smooth collaboration.
 📜 How to Contribute
1. Fork the repository and clone it.
2. Create a feature branch (`git checkout -b feature-branch-name`).
3. Make changes while following ES6+ standards.
4. Run tests before pushing (`npm test`).
5. Commit with a clear message (`git commit -m "feat: added multilingual support"`).
6. Push to GitHub and open a Pull Request (PR).



Future Improvements
Enhance authentication with JWT-based login.
Build a React frontend for a modern UI experience.
