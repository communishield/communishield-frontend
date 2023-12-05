# Communishield Frontend

## Overview

Communishield Frontend is a dynamic and responsive web interface for the Communishield API. It offers a user-friendly platform for managing user authentication, group management, and file/directory operations. Seamlessly integrating with the Communishield backend, it ensures a cohesive and efficient user experience.

## Running the Application

### Local Development

To run the Communishield Frontend on your local machine:

1. Ensure Node.js and a package manager like npm or yarn are installed.
2. Clone the frontend repository:

   ```bash
   git clone git@github.com:communishield/communishield-frontend.git
   ```

3. Navigate to the cloned directory:

   ```bash
   cd communishield-frontend/app
   ```

4. Install the dependencies:

   ```bash
   npm install # or yarn install
   ```

5. Start the development server:

   ```bash
   npm run dev # or yarn dev
   ```

   This command will launch the Vite server and open the application in your default web browser.

### Building for Production

To build the Communishield Frontend for production:

1. In the application directory (`app`), execute:

   ```bash
   npm run build # or yarn build
   ```

2. The build output will be in the `dist/` directory, ready for deployment on your preferred hosting service.

### Using Docker

For deployment, it is recommended to use Docker. The necessary files are provided in the "docker" directory:

1. Ensure Docker and Docker Compose are installed.
2. Navigate to the Docker directory in the cloned repository:

   ```bash
   cd communishield-frontend
   ```

3. Run the Docker Compose:

   ```bash
   docker-compose up
   ```

This command will set up and launch the Communishield Frontend using Docker, simplifying the deployment process.

## Accessing API Documentation

While the frontend does not host API documentation, it interfaces with the Swagger UI from the backend. Ensure the backend is running and access the documentation at the `/docs` route for detailed API information.

## License

The Communishield Frontend is open-source software, licensed under the AGPL-3.0. For more details, refer to the [LICENSE](https://github.com/communishield/communishield-frontend/blob/main/LICENSE) in the repository.
