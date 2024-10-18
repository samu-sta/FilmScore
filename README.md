# FilmScore

FilmScore is a movie review page where users can browse and review their favorite movies.

## Technologies Used

- **JWT**: For secure authentication and authorization.
- **Node.js**: For the server-side runtime environment.
- **Express**: For building the server and handling routes.
- **React**: For building the client-side user interface.

## Requirements

- Node.js version 22.09

## Steps to Set Up and Run the Project

1. Clone the repository:

    ```sh
    git clone https://github.com/TheGamas/FilmScore
    ```

2. Navigate to the project directory:

    ```sh
    cd FilmScore
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

4. Create a `.env` file in the project root directory with the following content:

    ```properties
    JWT_SECRET=your_secret_key_here
    ```

    Replace `your_secret_key_here` with a long, random string for security.

5. Build the React application:

    ```sh
    npm run build
    ```

6. Start the server:

    ```sh
    npm start
    ```

7. Open your browser and navigate to:

    ```sh
    http://localhost:4000
    ```

You should now see the application running.
