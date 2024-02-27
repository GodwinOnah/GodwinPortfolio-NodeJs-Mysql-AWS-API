// README.md
# Onah-Godwin-Portfolio-Node-Server
### Introduction
Onah-Godwin-Portfolio-Node-Server  is a portfolio web API built with Node.Js. It contains the Home, About me, Contact me, Resume, and settings pages. The Settings page is the admin page where items can be added, updated, and deleted from the resume via any device online.
### Project Support Features
* Only the admin can signup or login to his/her account
* Public (non-authenticated) users can access each page, however, they cannot login, signup, modify or delete item(s) on the applicationn
* Authenticated users can access as well as pay for items.

### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /projects | To add a product items |
| POST | /schools | To save item image |
| POST | /trainings | To add a delivery option
| POST | /skills | To add an advertisment |
| POST | /pmessages | To add confirmed order to admin table |
| POST | /messages | To add confirmed order to admin table |
| POST | /login | To add confirmed order to admin table |
| POST | /register | To add confirmed order to admin table |
| POST | /cvs | To add confirmed order to admin table |
| POST | /photos | To add confirmed order to admin table |
| POST | /profiles | To add a new order |
| POST | /hobbies | To add a new order |
| POST | /phone | To add a new order |
| GET | /projects | To add a product items |
| GET | /projects/:id | To add a product items |
| GET | /schools | To save item image |
| GET | /trainings | To add a delivery option
| GET | /skills | To add an advertisment |
| GET | /pmessages | To add confirmed order to admin table |
| GET | /messages | To add confirmed order to admin table |
| GET | /login | To add confirmed order to admin table |
| GET | /register | To add confirmed order to admin table |
| GET | /cvs | To add confirmed order to admin table |
| GET | /photos | To add confirmed order to admin table |
| GET | /profiles | To add a new order |
| GET | /hobbies | To add a new order |
| GET | /phone | To add a new order |
| GET | /phone/:id | To add a new order |
| GET | /undercontruction | To add a new order |
| PUT | /profiles | To edit confirmed order save on admin table |
| PUT | /unconstruction | To user order |
| PUT | /pmessages | To user order |
| DELETE | /projects | To add a product items |
| DELETE | /projects/:id | To add a product items |
| DELETE | /schools | To save item image |
| DELETE | /schools/:id | To save item image |
| DELETE | /trainings | To add a delivery option
| DELETE | /trainings/:id | To add a delivery option
| DELETE | /skills | To add an advertisment |
| DELETE | /skills/:id | To add an advertisment |
| DELETE | /pmessages | To add confirmed order to admin table |
| DELETE | /messages | To add confirmed order to admin table |
| DELETE | /messages/:id | To add confirmed order to admin t| DELETE | /cvs | To add confirmed order to admin table |
| DELETE | /cvs/:id | To add confirmed order to admin table |
| DELETE | /photos | To add confirmed order to admin table |
| DELETE | /photos/:id | To add confirmed order to admin table |
| DELETE | /profiles/id | To add a new order |
| DELETE | /hobbies | To add a new order |
| DELETE | /hobbies/:id | To add a new order |
| DELETE | /phone | To add a new order |
| DELETE | /phone/:id | To add a new order |
### Database Connections
#### 1. Heroku postgreSQL connection
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});
#### 2. Local postgreSQL connection
const db = knex({
     client: 'pg',
     connection: {
         host:'127.0.0.1',
         user:'godwinonah',
         password:'',
         database:'Godwin'
     }
 });
### Install PostgreSQL Locally
 Run npm install pg
### Start PostgreSQL with brew
 Run brew start psql;
### Create PostgreSQL database
  createdb '<name>';
   ### Connect to PostgreSQL database
   psql '<name>';
 ### Creating Tables
 CREATE TABLE projects (id serial primary key, projecttitle VARCHAR, projectdescription text,videolink VARCHAR, githubname VARCHAR,projectlink VARCHAR); 
 CREATE TABLE skills (id serial primary key,skill VARCHAR); 
 CREATE TABLE underconstruction (id serial primary key, underconstruction boolean);
 INSERT INTO  underconstruction (underconstruction)values(false); 
 CREATE TABLE pmessages (id serial primary key,pmessage VARCHAR); 
 CREATE TABLE phone (id serial primary key,phone VARCHAR); 
 CREATE TABLE photos (id serial primary key,photo VARCHAR); 
 CREATE TABLE messages (id serial primary key, name text, email varchar, phone Varchar, companyname VARCHAR, subject varchar, message varchar); 
 CREATE TABLE register (id serial primary key,name  VARCHAR, email VARCHAR,maidenname  VARCHAR,password  VARCHAR); 
 CREATE TABLE cvs (id serial primary key,cv VARCHAR); 
 CREATE TABLE schools (id serial primary key,honor VARCHAR,school  VARCHAR, course  VARCHAR,courselink  VARCHAR,graduationyear text); 
 CREATE TABLE trainings (id serial primary key,course  VARCHAR, company  VARCHAR,companywebsite  VARCHAR,certificate  VARCHAR,year  text); 
 CREATE TABLE hobbies (id serial primary key,hobby VARCHAR); 
 CREATE TABLE profiles (id serial primary key,profile text); 
### Technologies Used
* [Node.js](https://nodejs.com) Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting.
* [Express.js](https://expressjs.com) Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.
* [SQL] Structured Query Language is a domain-specific language used to manage data, especially in a relational database management system. It is particularly useful in handling structured data, i.e., data incorporating relations among entities and variables.
*  [Heroku](https://heroku.com) Heroku is a cloud platform as a service supporting several programming languages. As one of the first cloud platforms, Heroku has been in development since June 2007, when it supported only the Ruby programming language, but now also supports Java, Node.js, Scala, Clojure, Python, PHP, and Go.
### Authors
* [Onah Godwin Obande](https://godwinportfolio.azurewebsites.net)
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/photo_images/godwin-onah.png?raw=true)
### Project Screenshots
#### 1
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage1.png?raw=true)
#### 2
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage2.png?raw=true)
#### 3
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage3.png?raw=true)
#### 4
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage4.png?raw=true)
#### 5
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage5.png?raw=true)
#### 6
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage6.png?raw=true)
#### 7
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage7.png?raw=true)
#### 8
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage8.png?raw=true)
#### 9
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage9.png?raw=true)
#### 10
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage10.png?raw=true)
#### 11
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Server/public/projectScreenshots/pimage11.png?raw=true)
### License
This project is available for use under my approval.
