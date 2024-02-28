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
| POST | /projects | To add a project items |
| POST | /schools | To add a school items |
| POST | /trainings | To add a training |
| POST | /skills | To add a skill |
| POST | /pmessages | To add an advertismenet message |
| POST | /messages | To add message to database|
| POST | /login | To login as admin |
| POST | /register | To register as admin |
| POST | /cvs | To add a resume |
| POST | /photos | To add a photo |
| POST | /profiles | To add a profile |
| POST | /hobbies | To add a hobbie |
| POST | /phone | To add a phone number |
| GET | /projects | To view all projects |
| GET | /projects/:id | To view a project |
| GET | /schools | To view all schools |
| GET | /trainings | To view all trainings |
| GET | /skills | To view all skills |
| GET | /pmessages | To view all advert messages |
| GET | /messages | To view all messages |
| GET | /register | To get registered details |
| GET | /cvs | To view available resume |
| GET | /photos | To view all available photos |
| GET | /profiles | To view all profiles |
| GET | /hobbies | To view all hobbies |
| GET | /phone | To view all phone numbers |
| GET | /phone/:id | To view a phone number |
| GET | /undercontruction | To view boolean value of page set to 'under construction' or not  |
| PUT | /profiles | To edit profile |
| PUT | /unconstruction | To edit the state of page set to underconstruction|
| DELETE | /projects | To delete all project items |
| DELETE | /projects/:id | To delete a project item |
| DELETE | /schools | To delete all school items |
| DELETE | /schools/:id | To delete a school item |
| DELETE | /trainings | To delete all trainings |
| DELETE | /trainings/:id | To delete a training |
| DELETE | /skills | To delete all skills |
| DELETE | /skills/:id | To delete a skill |
| DELETE | /pmessages | To delete all advert messages |
| DELETE | /messages | To delete all messages |
| DELETE | /messages/:id | To delete a message |
| DELETE | /cvs/:id | To delete a resume |
| DELETE | /photos | To delete all photos  |
| DELETE | /photos/:id | To delete a photo |
| DELETE | /profiles/id | To delete a profile |
| DELETE | /hobbies | To delete all hobbies |
| DELETE | /hobbies/:id | To delete a hobby |
| DELETE | /phone | To delete all phone numbers|
| DELETE | /phone/:id | To delete a phone number |
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
  createdb 'database_name';
   ### Connect to PostgreSQL database
   psql 'database_name';
 ### Creating Tables
 CREATE TABLE projects (id serial primary key, projecttitle VARCHAR, projectdescription text,videolink VARCHAR, githubname VARCHAR,projectlink VARCHAR);<br/> 
 CREATE TABLE skills (id serial primary key,skill VARCHAR);<br/> 
 CREATE TABLE underconstruction (id serial primary key, underconstruction boolean);<br/> 
 INSERT INTO  underconstruction (underconstruction)values(false);<br/> 
 CREATE TABLE pmessages (id serial primary key,pmessage VARCHAR);<br/> 
 CREATE TABLE phone (id serial primary key,phone VARCHAR);<br/>  
 CREATE TABLE photos (id serial primary key,photo VARCHAR);<br/>  
 CREATE TABLE messages (id serial primary key, name text, email varchar, phone Varchar, companyname VARCHAR, subject varchar, message varchar);<br/>  
 CREATE TABLE register (id serial primary key,name  VARCHAR, email VARCHAR,maidenname  VARCHAR,password  VARCHAR);<br/> 
 CREATE TABLE cvs (id serial primary key,cv VARCHAR);<br/> 
 CREATE TABLE schools (id serial primary key,honor VARCHAR,school  VARCHAR, course  VARCHAR,courselink  VARCHAR,graduationyear text);<br/>  
 CREATE TABLE trainings (id serial primary key,course  VARCHAR, company  VARCHAR,companywebsite  VARCHAR,certificate  VARCHAR,year  text);<br/>  
 CREATE TABLE hobbies (id serial primary key,hobby VARCHAR);<br/> 
 CREATE TABLE profiles (id serial primary key,profile text);<br/> 
### Technologies Used
* [Node.js](https://nodejs.com) Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting.
* [Express.js](https://expressjs.com) Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.
* [SQL] Structured Query Language is a domain-specific language used to manage data, especially in a relational database management system. It is particularly useful in handling structured data, i.e., data incorporating relations among entities and variables.
*  [Heroku](https://heroku.com) Heroku is a cloud platform as a service supporting several programming languages. As one of the first cloud platforms, Heroku has been in development since June 2007, when it supported only the Ruby programming language, but now also supports Java, Node.js, Scala, Clojure, Python, PHP, and Go.
### Authors
* [Onah Godwin Obande](https://godwinportfolio.azurewebsites.net)
* ![alt text](https://github.com/GodwinOnah/Onah-godwin-Portfolio-Node-Server/blob/main/public/photo_images/godwin-onah.png?raw=true)
### Project Screenshots
#### 1
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage1.png?raw=true)
#### 2
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage2.png?raw=true)
#### 3
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage3.png?raw=true)
#### 4
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage4.png?raw=true)
#### 5
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage5.png?raw=true)
#### 6
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage6.png?raw=true)
#### 7
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage7.png?raw=true)
#### 8
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage8.png?raw=true)
#### 9
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage9.png?raw=true)
#### 10
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage10.png?raw=true)
#### 11
* ![alt text](https://github.com/GodwinOnah/BlessingAPI/blob/main/ONAHGODWIN_PORTFOLIO_SERVER/Onah_Godwin_Portfolio_Node_Server/public/projectScreenshots/pimage11.png?raw=true)
### License
This project is available for use under my approval.
