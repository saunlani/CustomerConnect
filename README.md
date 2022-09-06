# CustomerConnect

Web application which uses Node.js, TypeScript, React and Vite (among other tools and libraries).

## Get Started
- Clone the repository.
- Create your own free MongoDB Atlas account (and cluster).
- Reference the .env.example for correct formatting for the DB_URI variable.
- "docker compose up" in the project directory; Docker will automatically install all dependencies and run the application with hot module replacement.
- Using Postman (or some other REST client), use the customers.json file provided in this project to populate the database via a POST request to ".../api/v1/customers/import".
- Access the application with your browser via port 3000, or whatever port you have specified in the docker files and vite.config.ts.
- That's it! The application will run in development mode with HMR for both the front- and back-end.