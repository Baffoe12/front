# Deployment Instructions for SafeDrive Project

## Backend Deployment on Vercel

1. Push your backend code to a GitHub repository.

2. Ensure the following files are present in the backend repo:
   - `server.js`
   - `package.json` with correct dependencies and start script
   - `vercel.json` with Node.js server configuration

3. Log in to [Vercel](https://vercel.com/) and create a new project linked to your backend GitHub repository.

4. In the Vercel project settings, add the following environment variables:
   - `DATABASE_URL` (your PostgreSQL connection string)
   - `SAFEDRIVE_API_KEY` (your API key for authentication)
   - Any other required environment variables

5. Deploy the project. Vercel will use `vercel.json` to build and route requests to your backend server.

6. After deployment, verify the backend API is accessible via the Vercel URL.

---

## Dashboard Deployment on Netlify

1. Push your dashboard frontend code to a separate GitHub repository.

2. Ensure the following files are present in the dashboard repo:
   - `package.json` with build scripts
   - `public/index.html`
   - `netlify.toml` with build and publish settings

3. Log in to [Netlify](https://app.netlify.com/) and create a new site linked to your dashboard GitHub repository.

4. In the Netlify site settings, configure:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Environment variable: `REACT_APP_API_URL` set to your backend API URL deployed on Vercel

5. Deploy the site. Netlify will build and serve your React app as a static site.

6. After deployment, verify the dashboard is accessible and communicates correctly with the backend API.

---

## Testing and Maintenance

- Test both backend and frontend deployments independently.
- Monitor logs and errors on Vercel and Netlify dashboards.
- Update environment variables and redeploy as needed.
- Use separate GitHub repositories for backend and frontend for better maintainability.

---

If you need assistance with GitHub repository setup, environment variable configuration, or deployment troubleshooting, please reach out.

---
