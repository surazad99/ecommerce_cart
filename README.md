## Read this file to setup backend in your local machine

1. First clone the project
    ```shell script
   git clone repository_link
   cd ecommerce_cart
    ```

2. Run the following command 
  -to install the dependencies via composer
  ```sh
  composer install
  ```
 -to install the dependencies via npm
  ```sh
  npm install
  ```

3. Create a database in your local server

4. Copy `.env.example` file and paste it in same directory with name `.env`
    ```shell script
     cp .env.example .env
    ```

6. Open `.env` file and connect to your database by placing these credentials
    ```env
    DB_DATABASE=database_name 
    DB_USERNAME=your db_username 
    DB_PASSWORD=your db_password
    ```

7. After saving `.env` file  open terminal and run the following commands to set up server
  - to migrate all the tables to your database
    ```sh
    php artisan migrate
    ```
  - check your database if all the tables are there

  - to seed the user table run the following command this gives you user and admin credentials
    ```sh
    php artisan db:seed
    ```
   
  - now start the laravel server using following command
    ```sh
    composer run dev
    ```
  - Go to the url where server is started and Login to the app as user using credentials
    - Email: test@example.com
    - Password: password
8. Go to /products url to view the products page.

9. Open `.env` file and add your mail credentials for example mailtrap to test the email notification
    ```env
    MAIL_MAILER=smtp
    MAIL_HOST=sandbox.smtp.mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME=
    MAIL_PASSWORD=
    ```

 
Happy Coding!
