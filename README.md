# Job Board Application

A full-stack job board application built with **Next.js**, **TailwindCSS**, **Prisma**, and **JWT Authentication**. The application allows users to view job listings, register, log in, and manage their jobs by adding, viewing, and deleting posts. 

## Features
- **Home Page:** Displays all available job listings.
- **JWT Authentication:** Handles user authentication with secure login and registration processes.
- **Dashboard:** Authenticated users can add, view, and delete their job listings.
- **Session Management:** Keeps the user logged in during their session.
- **Sign Out:** Provides a way for users to log out.

## Screenshots

<p align="center">
  <img src="public/images/Project1.png" width="400"/>
</p>

<p align="center">
  <img src="public/images/Project2.png" width="400"/>
</p>

<p align="center">
  <img src="public/images/Project3.png" width="400"/>
</p>

<p align="center">
  <img src="public/images/Project4.png" width="400"/>
</p>

## Installation

### Prerequisites
Make sure you have the following tools installed:
- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (or any other relational database, modify Prisma schema accordingly)

### Steps to Set Up the Project

1. **Clone the Repository:**

git clone <your-repository-url>
cd <your-project-folder>

2. **Install Dependencies:**

Install project dependencies using npm:
npm install

3. **Set Up Environment Variables:**

Create a .env file in the root of the project and configure your environment variables:

DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-jwt-secret"

Replace the DATABASE_URL with your actual PostgreSQL connection string, and provide a strong secret for JWT_SECRET.

4. **Run Database Migrations:**

Use Prisma to generate the necessary database tables:

npx prisma migrate dev --name init

5. **Start the Development Server:**

Start the Next.js development server:

    npm run dev

  - **Visit http://localhost:3000 in your browser.**
---

**Basic Functions Used**
1. Home Page:

    Displays a list of all available job postings fetched from the API (/api/jobs).

    Users can search jobs by job type (Full-Time, Part-Time, Contract, All) and by location.

2. JWT Authentication:

    Implements a JWT-based authentication system.

    Users can log in and register by providing their email and password.

    Upon successful login, a JWT is stored in the browser’s session for session management.

3. Login & Register:

    Users can register with an email and password, and they receive a JWT token.

    After registration or login, users are redirected to their dashboard page.

    The JWT token is stored in the session to maintain the user's login state.

4. Dashboard (Authenticated Users):

    Add Job: Authenticated users can add new job postings via the dashboard.

    View Jobs: Users can view the list of jobs they've posted.

    Delete Job: Users can delete jobs they have posted from their dashboard.

5. Sign Out:

    A sign-out button allows users to log out of their session, which invalidates their JWT token.
---

**Technologies Used**

    Frontend: Next.js, TailwindCSS

    Backend: Next.js API Routes

    Database: PostgreSQL (via Prisma ORM)

    Authentication: JWT (JSON Web Token)

    Styling: TailwindCSS
---

**API Routes**

1. /api/jobs

    GET: Fetches all job listings.

    POST: Allows authenticated users to add a new job listing.

2. /api/auth/register

    POST: Allows a user to register by providing an email and password.

3. /api/auth/login

    POST: Allows a user to log in with their email and password and receive a JWT token.

4. /api/jobs

    DELETE: Allows an authenticated user to delete their job listing by ID.
---
**How to Contribute**

    Fork the repository.

    Create a new branch (git checkout -b feature-name).

    Commit your changes (git commit -am 'Add new feature').

    Push to the branch (git push origin feature-name).

    Create a new pull request.

**License**

This project is licensed under the MIT License - see the LICENSE file for details.


### Key Sections in the README:

1. **Installation Instructions:**
   - Provides clear steps for cloning the repo, installing dependencies, setting up environment variables, running migrations, and starting the development server.

2. **Basic Functions:**
   - Summarizes the key features such as viewing jobs, searching, authentication, job management (adding, viewing, deleting), and session management.

3. **API Routes:**
   - Lists the important API routes and their functions (jobs management, authentication).

4. **Contributing:**
   - Provides guidelines on how to contribute to the project.

5. **License:**
   - Mentions the license under which the project is distributed (if applicable).

Let me know if you'd like to make any further modifications!
