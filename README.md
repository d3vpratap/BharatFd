BharatFd - Backend Developer Assignment

Aim
The project aims to store FAQs as a model and dynamically display translations using the Google Translate API.

 Tech Stack
- Backend: Node.js, Express.js
- Database: MongoDB (with Redis for caching)
- Frontend: EJS templating
- APIs: REST API structure
- Caching: Redis

 Assumptions
1. Backend-Centric: The project focuses on backend development.
2. Simple Authentication: Admin login uses hardcoded credentials for simplicity.
3. Minimal UI Framework: EJS is used for fast rendering and dynamic content.

 Installation Guide
1. Download the zip file.
2. Extract the zip file.
3. Change the current directory to the project folder (`BharatFd`).
4. Run `npm install` to install all dependencies.
5. Create a `.env` file and set the environment variables for:
   - `MONGO_DB_URL`: MongoDB connection URL
   - `PROJECT_ID`: Google Translate API project ID
6. Run the app using `node app.js` to start the server.
7. Log in using the following credentials:
   - Email: `admin@example.com`
   - Password: `admin`

Upon login, you'll be redirected to `/api/faqs`.

API Usage Examples

-Fetch FAQs in English (default)**
  ```bash
  curl http://localhost:8000/api/faqs/
  ```
This will render the EJS template for the dashboard, displaying current FAQs, a form to add new FAQs, and buttons to select different languages for dynamic translations.

- Fetch FAQs in Hindi**
  ```bash
  curl http://localhost:8000/api/faqs/?lang=hi
  ```

- Fetch FAQs in Bengali**
  ```bash
  curl http://localhost:8000/api/faqs/?lang=bn
  ```

- Fetch a specific FAQ by ID**
  ```bash
  curl http://localhost:8000/api/faqs/:faqid
  ```

## Using Docker
To run the project in a Docker container, follow these steps:

1. Build the Docker image:
   ```bash
   docker build -t bharatfd .
   ```

2. Run the Docker container using Docker Compose:
   ```bash
   docker-compose up
   ```

3. Verify that the app is running by opening your browser and visiting [http://localhost:8000](http://localhost:8000).

This will start the backend API, MongoDB, and Redis services as defined in `docker-compose.yml`.

## Contribution Guidelines
Thank you for considering contributing to BharatFD! Please follow these guidelines to ensure a smooth collaboration.

### How to Contribute
1. Fork the repository and clone it to your local machine.
2. Create a feature branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Make your changes following ES6+ standards.
4. Run tests before pushing:
   ```bash
   npm test
   ```
5. Commit your changes with a clear and concise message:
   ```bash
   git commit -m "feat: added multilingual support"
   ```
6. Push your changes to GitHub and open a Pull Request (PR).

Future Improvements
- Implement JWT-based authentication for enhanced security.
- Build a modern UI using React for a more interactive user experience.

---
Thanks to Bharat Fd for providing this opportunity.
