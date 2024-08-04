import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import {createPool} from 'mysql2/promise';
import nodeMailer from 'nodemailer';
import {config} from 'dotenv';

config();
const app = express();
app.use(cors());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//connecting to remote (dockerized) database using connection pool
const pool = createPool({       
        host:process.env.MYSQL_HOST,
        port:process.env.MYSQL_PORT,
        user:process.env.MYSQL_USER,
        password:process.env.MYSQL_PASSWORD,
        database:process.env.MYSQL_DATABASE_NAME
    }
);


const connectToDatabase = async () => {
    try{
           const t = await pool.getConnection();
            console.log("Database connection successful!!");
    }
    catch(error){
            console.log("Database connection failed!!");
            console.log(error);
            throw(error);
    };
}

const client = await pool.getConnection();

// Under Construction Section
app.put('/underconstruction', async (req, res) => {
    const underconstruction = req.body;
    const QUERY = " UPDATE underconstruction SET underconstruction = ?";
    try
    {
    const result = await client.query(QUERY,[underconstruction]);
    return res.json(result[0]);
    }
    catch(error){
        console.log('page not updated');
        throw(error);
    }
})

app.get('/underconstruction', async (req, res) => { 
    const QUERY = " SELECT * FROM underconstruction ";
    try
    {
    const result = await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No web page under construction value found');
        throw(error);
    }
})


// PROJECT Get Projects
app.get('/projects', async (req, res) => {
   const QUERY = " SELECT * FROM projects ";
    try
    {
    const result =await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No project added or found');
        throw(error);
    }
})

app.delete('/projects/:id', async(req, res) => {
    const QUERY = " DELETE FROM projects WHERE id = ?";
    try
    {
    const result = await client.query(QUERY,[req.params.id]);
    if(result)
    return res.json("Project deleted");
    return res.json("Project not deleted");
    }
    
    catch(error){
        console.log('No project added or found');
        throw(error);
    }
})

//Delete all Projects
app.delete('/projects', async(req, res) => {
    const QUERY = " DELETE FROM projects";
    try
    {
    const result = await client.query(QUERY);
    if(result)
    return res.json("All project(s) deleted");
    return res.json("Project(s) not deleted");
    }   
    catch(error){
        console.log('No project added or found');
        throw(error);
    }
})

// Add Projects
app.post('/projects', async (req, res) => {
    const {projectTitle, projectDescription, videoLink, gitHubLink, projectLink} = req.body;
    const QUERY = " INSERT INTO projects (projecttitle, projectdescription, videolink, githubname, projectlink) VALUES (?,?,?,?,?)";
    try
    {
    const result = await client.query(QUERY,[projectTitle, projectDescription, videoLink, gitHubLink, projectLink]);
    if(result)
    return res.json('New Project added');
    }
    catch(error){
        console.log('Project Not added');
        throw(error);
    }
})


// Education Get Schools
app.get('/schools', async (req, res) => {
    const QUERY = " SELECT * FROM schools ";
    try
    {
    const result =await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No SChool added or found');
        throw(error);
    }
})
// Delete school
app.delete('/schools/:id', async (req, res) => {
    const QUERY = " DELETE FROM schools WHERE id = ?";
    try
    {
    const result = await client.query(QUERY,[req.params.id]);
    if(result)
    return res.json("Schools deleted");
    return res.json("Schools not deleted");
    }  
    catch(error){
        console.log('No school added or found');
        throw(error);
    }
})

// Delete all school
app.delete('/schools', async (req, res) => {
    const QUERY = " DELETE * FROM schools";
    try
    {
    const result = await client.query(QUERY);
    if(result)
    return res.json("All school(s) deleted");
    return res.json("School(s) not deleted");
    }
    
    catch(error){
        console.log('No school added or found');
        throw(error);
    }
})

// Add schools
app.post('/schools', async (req, res) => {
    const {honor, school, course, courseLink, graduationYear} = req.body;
    const QUERY = " INSERT INTO schools (honor, school, course, courselink, graduationyear) VALUES (?,?,?,?,?)";
    try
    {
    const result = await client.query(QUERY,[honor, school, course, courseLink, graduationYear]);
    if(result)
    return res.json('New School added');
    }
    catch(error){
        console.log('School Not added');
        throw(error);
    }  
})

// Get Trainigs
app.get('/trainings', async (req, res) => {

    const QUERY = " SELECT * FROM trainings ";
    try
    {
    const result =await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No training added or found');
        throw(error);
    }
})
// Delete Training
app.delete('/trainings/:id', async(req, res) => { 
    
    const QUERY1 = " SELECT certificate FROM trainings WHERE id = ?";
    const QUERY2 = " DELETE FROM trainings WHERE  certificate = ?";
    try
    {
    const certificate = await client.query(QUERY1,[req.params.id]);
    const result = await client.query(QUERY2,[certificate[0][0].certificate]);
    if(result){
        fs.unlinkSync(`public/certificates/${certificate[0][0].certificate}`) //deleting file from folder
        return res.json("Training deleted");
    }
    return res.json("Training not deleted");
    }
    
    catch(error){
        console.log('No training added or found');
        throw(error);
    }
})

// Delete all Trainings
app.delete('/trainings', async(req, res) => { 
    const QUERY1 = " SELECT certificate FROM trainings";
    const QUERY2 = " DELETE FROM trainings";
    try
    {
    const certificate = await client.query(QUERY1);
    console.log(certificate)
    const result = await client.query(QUERY2);
    if(result){
        fs.unlinkSync(`public/certificates/${certificate}`) //deleting file from folder
        return res.json("All training(s) deleted");
    }
    return res.json("Training(s) not deleted");
    }
    
    catch(error){
        console.log('No training added or found');
        throw(error);
    }
})

// Add training
const storageTraining = multer.diskStorage({ //Saving Certificate image
    destination: (req, file, cd) => {
        cd(null, 'public/certificates')
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}_${file.originalname}`)
    }
})

const uploadTraining = multer({storage: storageTraining});

app.post('/trainings', uploadTraining.single('certificateFile'), async (req, res) => {
    const certificateFileName = req.file.filename;
    const {tCourse, tCompany, tCompanyWebsite, tYear} = req.body;
    const QUERY = " INSERT INTO trainings (course, company, companywebsite, certificate, year) VALUES (?,?,?,?,?)";
    try
    {
    const result = await client.query(QUERY,[tCourse, tCompany, tCompanyWebsite,certificateFileName, tYear]);
    if(result)
    return res.json('New School added');
    }
    catch(error){
        console.log('School Not added');
        throw(error);
    }
})

// SKILL Get Skills
app.get('/skills', async (req, res) => {

    const QUERY = " SELECT * FROM skills";
    try
    {
    const result = await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No skill added or found');
        throw(error);
    }
})

// Delete Skill
app.delete('/skills/:id', async(req, res) => {
    const QUERY = " DELETE FROM skills WHERE id = ?";
    try
    {
    const result = await client.query(QUERY,[req.params.id]);
    if(result)
    return res.json("Skill deleted");
    return res.json("Skill not deleted");
    }
    
    catch(error){
        console.log('No skill added or found');
        throw(error);
    }
})

// Delete All Skill
app.delete('/skills', async(req, res) => {
    const QUERY = " DELETE FROM skills";
    try
    {
    const result = await client.query(QUERY);
    if(result)
    return res.json("All Skills deleted");
    return res.json("All Skills not deleted");
    }
    
    catch(error){
        console.log('No skill added or found');
        throw(error);
    }
})

//  Add Skills
app.post('/skills', async(req, res) => {
    const skill = req.body;
    const QUERY = " INSERT INTO skills (skill) VALUES (?)";
    try
    {

    const result = await client.query(QUERY,[skill.skill]);
    if(result)
    return res.json('Skill added');
    }
    catch(error){
        console.log('No skill added or found');
        throw(error);
    }
    if (!skill) {
        res
            .status(400)
            .json('Skill not recieved');
        return;
    }
})

//PUBLIC MESSAGE Get Public Message
app.get('/pmessages', async (req, res) => {

    const QUERY = " SELECT * FROM pmessages ";
    try
    {
    const result = await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No alert/notification message added by this time');
        throw(error);
    }
})

// Delete public message
app.delete('/pmessages/:id', async(req, res) => {
    const QUERY = " DELETE FROM pmessages WHERE id = ?";
    try
    {
    const result = await client.query(QUERY,[req.params.id]);
    if(result)
    return res.json("Message deleted");
    return res.json("Message not deleted");
    }
    
    catch(error){
        console.log('No message found');
        throw(error);
    }
})

// Delete all public message
app.delete('/pmessages', async(req, res) => {
    const QUERY = " DELETE FROM pmessages";
    try
    {
    const result = await client.query(QUERY);
    if(result)
    return res.json("Messages deleted");
    return res.json("Messages not deleted");
    }
    
    catch(error){
        console.log('No message found');
        throw(error);
    }
})

//  Add public message
app.post('/pmessages', async(req, res) => {
    const pmessage = req.body;
    const QUERY = " INSERT INTO pmessages (pmessage) VALUES (?)";
    try
    {
    const result = await client.query(QUERY,[pmessage.pmessage]);
    if(result)
    return res.json('Advert added');
    }
    catch(error){
        console.log('Advert not added');
        throw(error);
    }
})

// PROFILE Get Profile
app.get('/profiles', async (req, res) => {

    const QUERY = "SELECT * FROM profiles";
    try
    {
    const result = await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No profile summary added of found');
        throw(error);
    }

})

// Delete Profile
app.delete('/profiles/:id', async(req, res) => {
    const QUERY = " DELETE FROM profiles WHERE id = ?";
    try
    {
    const result = await client.query(QUERY,[req.params.id]);
    if(result)
    return res.json("Profile deleted");
    return res.json("Profile not deleted");
    }
    
    catch(error){
        console.log('No profile found');
        throw(error);
    }
})
//  Add Profile
app.post('/profiles', async(req, res) => {
    
    const {profileTitle, profile} = req.body;
    const QUERY = " INSERT INTO profiles (profiletitle, profile) VALUES (?,?)";
    try
    {
    const result = await client.query(QUERY,[profileTitle,profile]);
    if(result)
    return res.json('New profile summary added');
    }
    catch(error){
        console.log('Profile not added');
        throw(error);
    }
})

// Update Profile
app.put('/profiles', async (req, res) => {
    const {profileTitle, profile} = req.body;
    const QUERY = " UPDATE profiles SET profiletitle = ?, profile = ? ";
    try
    {
    const result = await client.query(QUERY,[profileTitle, profile]);
    return res.json(result[0]);
    }
    catch(error){
        console.log('Profile not updated');
        throw(error);
    }
})

// HOBBY Get Hobbies
app.get('/hobbies', async (req, res) => {

    const QUERY = " SELECT * FROM hobbies ";
    try
    {
    const result =await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No hobby added or found');
        throw(error);
    }
})

// Delete Hobby
app.delete('/hobbies/:id', async(req, res) => {
    const QUERY = " DELETE FROM hobbies WHERE id = ?";
    try
    {
    const result = await client.query(QUERY,[req.params.id]);
    if(result)
    return res.json("Hobby deleted");
    return res.json("Hobby not deleted");
    }
    
    catch(error){
        console.log('No hobby found');
        throw(error);
    }
})

// Delete all Hobbied
app.delete('/hobbies', async(req, res) => {
    const QUERY = " DELETE FROM hobbies";
    try
    {
    const result = await client.query(QUERY);
    if(result)
    return res.json("Hobbies deleted");
    return res.json("Hobbies not deleted");
    }
    
    catch(error){
        console.log('No hobby found');
        throw(error);
    }
})

//  Add Hobby
app.post('/hobbies', async(req, res) => {
    const hobby = req.body;
    const QUERY = " INSERT INTO hobbies (hobby) VALUES (?)";
    try
    {
    const result = await client.query(QUERY,[hobby.hobby]);
    if(result)
    return res.json('New hobby added');
    }
    catch(error){
        console.log('Hobby not added');
        throw(error);
    }
})

// PHONE Get Phonenumbers
app.get('/phone', async (req, res) => {
    const QUERY = " SELECT * FROM phone";
    try
    {
    const result = await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No phone number saved');
        throw(error);
    }
})

// Delete Phone
app.delete('/phone/:id', async(req, res) => {
    const QUERY = " DELETE FROM phone WHERE id = ?";
    try
    {
    const result = await client.query(QUERY,[req.params.id]);
    if(result)
    return res.json("Phone deleted");
    return res.json("Phone not deleted");
    }
    
    catch(error){
        console.log('No Phone found');
        throw(error);
    }
})

app.put('/phone', async (req, res) => {
    const {phone,myEmail,linkedIn,instagramName} = req.body;
    const QUERY = " UPDATE phone SET phone = ?, myemail = ?, linkedin = ?, instagramname = ? ";
    try
    {
    const result = await client.query(QUERY,[phone,myEmail,linkedIn,instagramName]);
    return res.json(result[0]);
    }
    catch(error){
        console.log('Profile not updated');
        throw(error);
    }
})

// Add Phonenumber
app.post('/phone', async(req, res) => {
    const {phone,myEmail,linkedIn,instagramName} = req.body;
    const QUERY = "INSERT INTO phone(phone,myemail,linkedin,instagramname) VALUES(?,?,?,?)";
    try
    {
    const result = await client.query(QUERY,[phone,myEmail,linkedIn,instagramName]);
    if(result)
    return res.json('New phone number added');
    }
    catch(error){
        console.log('Phone number not added');
        throw(error);
    }
})

// MESSSAGE Get Received Messages
app.get('/messages', async (req, res) => {
    const QUERY = " SELECT * FROM messages ";
    try
    {
    const result = await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No meesage received from employers by this time');
        throw(error);
    }
})

// Delete Message
app.delete('/messages/:id', async(req, res) => {
    const QUERY = " DELETE FROM messages WHERE id = ?";
    try
    {
    const result = await client.query(QUERY,[req.params.id]);
    if(result)
    return res.json("Message deleted");
    return res.json("Mesasge not deleted");
    }
    
    catch(error){
        console.log('No Message found');
        throw(error);
    }
})
// Delete all Message
app.delete('/messages', async(req, res) => {
    const QUERY = " DELETE FROM messages";
    try
    {
    const result = await client.query(QUERY);
    if(result)
    return res.json("Messages deleted");
    return res.json("Message not deleted");
    }
    
    catch(error){
        console.log('No message found');
        throw(error);
    }
})

app.get('/messages/:id', async (req, res) => {

    const QUERY = "SELECT * FROM messages WHERE id=?";
    try
    {
    const result =await client.query(QUERY,[id]);
    return res.json(result[0]);
    }
    catch(error){
        console.log('Message not gotten');
        throw(error);
    }
})

// Recieve a message
app.post('/messages', async(req, res) => { //Add Clothings
    const {name,email,companyName,subject,message} = req.body;
    const QUERY = " INSERT INTO messages (name,email,companyname,subject,message) VALUES (?,?,?,?,?)";
    try
    {
    const result = await client.query(QUERY,[name,email,companyName,subject,message]);
    if(result)
    return res.json('New message added');
    }
    catch(error){
        console.log('Message not added');
        throw(error);
    }
})

// LOGIN Admin Login Get Login
app.post('/login', async(req, res) => {
    const {email, hash} = req.body;

    const password = "SELECT password FROM register WHERE email=?";
    const QUERY = "SELECT * FROM register WHERE email=?";
    try
    {
    const resultPassword = await client.query(password,[email]);
    const result = await client.query(QUERY,[email]);
    if(resultPassword==hash)
    return res.json(result);
    }
    catch(error){
        console.log('You are not registered');
        throw(error);
    }
})

//Get register
app.get('/register', async (req, res) => {
    const QUERY = " SELECT * FROM register ";
    try
    {
    const result = await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No admin added or found');
        throw(error);
    }
})

//Add register
app.post('/register', async(req, res) => {
    const {name, email, maidenName, hash} = req.body;
    const QUERY = " INSERT INTO register (name, email, maidenname, password) VALUES (?,?,?,?)";
    try
    {
    const result = await client.query(QUERY,[name, email, maidenName, hash]);
    if(result)
    return res.json('Registration successful');
    }
    catch(error){
        console.log('Registration failed');
        throw(error);
    }
})

//Update user
app.put('/register', async (req, res) => {

    const {email, maidenName, hash} = req.body;

    const QUERY1 = " SELECT maidenname FROM register WHERE email = ?";
    const QUERY2 = " UPDATE register SET password = ? WHERE email = ?, maidenname = ?";
    const QUERY3 = " SELECT maidenname, email FROM register WHERE email = ?";

    try
    {
    const maidenname = await client.query(QUERY1,[email]);
    const maidennameAndEmail = await client.query(QUERY3,[email]);

    if (maidenname[0][0].maidenname == maidenName) {
       const result = await client.query(QUERY2,[hash,email,maidenName]);
       if(result){
         return res.json('Admin password updated');
                 } 
       else {
            return res.json('Admin password not updated');
         }
    }

    else{
        const messageTemplate = `<h1>Password Recovery</h1>
                                                 <p>Your recovery datails are:
                                                 <br/>
                                                  <br/>
                                                  Email: ${maidennameAndEmail[0][0].email},
                                                  <br/>
                                                  Maiden Name: ${maidennameAndEmail[0][0].maidenname}.
                                                  <br/>
                                                  <br/>
                                                  Thanks.
                                                  </p>
                                                  `;

                        const transporter = nodeMailer.createTransport({

                            service: 'gmail',
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: process.env.REACT_APP_USER,
                                pass: process.env.REACT_APP_PASSWORD
                            }
                        })

                        const info = transporter.sendMail({
                            from: {
                                name: 'Godwin',
                                address: process.env.REACT_APP_USER
                            },
                            to: process.env.REACT_APP_USER,
                            subject: 'Password Recovery',
                            html: messageTemplate
                        })
                        const sendMail = async(transporter, info) => {
                            try {
                                await transporter.sendMail(info);
                                res.json("Login Details sent your your email")
                            } catch (error) {
                                res.json("Check your email or make sure your network connection is good")
                            }
                        }

                        sendMail(transporter, info);
        
    }
    
    }
    catch(error){
        console.log('You are not an admin');
        throw(error);
    }
    
})

// Get Cv
app.get('/cvs', async(req, res) => {
    const QUERY = " SELECT * FROM cvs ";
    try
    {
    const result = await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No cv added or found');
        throw(error);
    }
})

//Add CV
const storageCv = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/CV_images')
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}_${file.originalname}`)
    }
})

const uploadCv = multer({storage: storageCv});

app.post('/cvs', uploadCv.single('cv'), async(req, res) => {
    const cv = req.file.filename
    const QUERY = " INSERT INTO cvs (cv) VALUES (?)";
    try
    {
    const result = await client.query(QUERY,[cv]);
    if(result)
    return res.json('CV added');
    }
    catch(error){
        console.log('CV not added');
        throw(error);
    }
})

// Delete CV
app.delete('/cvs/:id', async(req, res) => {
    const QUERY1 = " SELECT cv FROM cvs WHERE id = ?";
    const QUERY2 = " DELETE FROM cvs WHERE  cv = ?";
    try
    {
    const cv = await client.query(QUERY1,[req.params.id]);
    const result = await client.query(QUERY2,[cv[0][0].cv]);
    if(result){
        fs.unlinkSync(`public/CV_images/${cv[0][0].cv}`) //deleting file from folder
        return res.json("Resume deleted");
    }
    return res.json("Resume not deleted");
    }
    
    catch(error){
        console.log('No Resume added or found');
        throw(error);
    }
})

// Get photo
app.get('/photos', async (req, res) => {
    const QUERY = " SELECT * FROM photos ";
    try
    {
    const result =await client.query(QUERY);
    return res.json(result[0]);
    }
    catch(error){
        console.log('No photo added');
        throw(error);
    }
})

//Add Photo
const storagePhotos = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/photo_images')
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const uploadPhotos = multer({storage: storagePhotos});

app.post('/photos', uploadPhotos.single('photo'), async(req, res) => {
    const photo = req.file.filename;
    const QUERY = " INSERT INTO photos (photo) VALUES (?)";
    try
    {
    const result = await client.query(QUERY,[photo]);
    if(result)
    return res.json('Photo uploaded');
    }
    catch(error){
        console.log('Photo not uploaded');
        throw(error);
    }

})

// Delete Photo
app.delete('/photos/:id', async(req, res) => {
    const QUERY1 = " SELECT photo FROM photos WHERE id = ?";
    const QUERY2 = " DELETE FROM photos WHERE  photo = ?";
    try
    {
    const photo = await client.query(QUERY1,[req.params.id]);
    const result = await client.query(QUERY2,[photo[0][0].photo]);
    if(result){
        fs.unlinkSync(`public/photo_images/${photo[0][0].photo}`) //deleting file from folder
        return res.json("Photo deleted");
    }
    return res.json("Photo not deleted");
    }
    
    catch(error){
        console.log('No Photo added or found');
        throw(error);
    }
   
})

// Delete all Photos
app.delete('/photos', async(req, res) => {
    const QUERY1 = " SELECT * FROM photos";
    const QUERY2 = " DELETE FROM photos";
    try
    {
    const photos = await client.query(QUERY1);
    const result = await client.query(QUERY2);
    if(result){
        fs.unlinkSync(`public/photo_images/${photos[0]}`) //deleting file from folder
        return res.json("Photos deleted");
    }
    return res.json("Photos not deleted");
    }
    
    catch(error){
        console.log('No photo added or found');
        throw(error);
    }
})

connectToDatabase().then(()=>{
    const PORT = process.env.PORT
    app.listen(PORT || 3002, function () {
    console.log(`Sever running at port: ${PORT}`); });
})
.catch((error)=>{
    console.log("Error occured during database connection");
    console.log(error);
    process.exit(0);
});
