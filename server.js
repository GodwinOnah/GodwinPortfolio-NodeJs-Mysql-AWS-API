import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import nodeMailer from 'nodemailer';
import {} from 'dotenv/config'


const app = express();
app.use(cors());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//connecting to database using knex
const db = knex({    
        client: 'pg',
        connection:{
        connectionString: process.env.DATABASE_URL,
        ssl:{ rejectUnauthorized: false },
     }
});
// brew start psql
// createdb 'GodwinPortfolio'
// psql 'GodwinPortfolio'
// \l
// \d
// CREATE TABLE projects (id serial primary key, projecttitle VARCHAR, projectdescription text,videolink VARCHAR, githubname VARCHAR,projectlink VARCHAR);
// CREATE TABLE skills (id serial primary key,skill VARCHAR);
// CREATE TABLE pmessages (id serial primary key,pmessage VARCHAR);
// CREATE TABLE phone (id serial primary key,phone VARCHAR);
// CREATE TABLE photos (id serial primary key,photo VARCHAR);
// CREATE TABLE messages (id serial primary key, name text, email varchar, phone Varchar, companyname VARCHAR, subject varchar, message varchar);
// CREATE TABLE register (id serial primary key,name  VARCHAR, email  VARCHAR,maidenname  VARCHAR,password  VARCHAR);
// CREATE TABLE cvs (id serial primary key,cv VARCHAR);
// CREATE TABLE schools (id serial primary key,honor  VARCHAR,school  VARCHAR, course  VARCHAR,courselink  VARCHAR,graduationyear  text);
// CREATE TABLE trainings (id serial primary key,course  VARCHAR, company  VARCHAR,companywebsite  VARCHAR,certificate  VARCHAR,year  text);
// CREATE TABLE hobbies (id serial primary key,hobby VARCHAR);
// CREATE TABLE profiles (id serial primary key,profile text);

// PROJECT
// Get Projects
app.get('/projects',(req,res)=>{
        return  db.select('*').from('projects')
        .then(data=>{     
         res.json(data);
         })
})

app.delete('/projects/:id',(req,res)=>{
        db.delete('*').from('projects')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("Project deleted");
        })
        .catch(err=>res.status(400).json('Project not deleted')) 
})

// Add Projects
app.post('/projects',(req,res)=>{
        const {projectTitle,projectDescription,videoLink,gitHubLink,projectLink} = req.body;
        db('projects').insert({  
                projecttitle: projectTitle,                 
                projectdescription: projectDescription,
                videolink:videoLink,
                githubname: gitHubLink,
                projectlink: projectLink                
        })
        .then(data=>{     
                return  res.json("Project added");
        })  
        .catch(err=>res.status(400).json('Project not added'))   
 })

 // Education
// Get Schools
app.get('/schools',(req,res)=>{
        return  db.select('*').from('schools')
        .then(data=>{     
         res.json(data);
         })
         .catch(err=>res.status(400).json('No SChool added by this time')) 
})
// Delete school
app.delete('/schools/:id',(req,res)=>{
        db.delete('*').from('schools')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("School deleted");
        })
        .catch(err=>res.status(400).json('School not deleted')) 
})

// Add schools
app.post('/schools',(req,res)=>{
        const {honor,school,course,courseLink,graduationYear} = req.body;
        db('schools').insert({  
                honor: honor,
                school:school,                 
                course: course,
                courselink: courseLink,
                graduationyear: graduationYear               
        })
        .then(data=>{     
                return  res.json("School added");
        })  
        .catch(err=>res.status(400).json('School not added'))   
 })

 
// Get Trainigs
app.get('/trainings',(req,res)=>{
        return  db.select('*').from('trainings')
        .then(data=>{     
         res.json(data);
         })
         .catch(err=>res.status(400).json('No Trainning added by this time')) 
})
// Delete Training
app.delete('/trainings/:id',(req,res)=>{
        db.select('certificate').from('trainings')
        .where({id:req.params.id})
        .then(data=>{   
        fs.unlinkSync(`public/certificates/${data[0].certificate}`) //deleting file from folder
        }) 

        db.delete('*').from('trainings')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("Training deleted");
        })
        .catch(err=>res.status(400).json('Trainning not deleted')) 
})

// Add training
const storageTraining = multer.diskStorage({
        destination:(req,file,cd)=>{
                cd(null,'public/certificates')
        },
        filename:(req,file,cd)=>{
                cd(null, `${Date.now()}_${file.originalname}`)
        }
})

const uploadTraining = multer({storage:storageTraining});

app.post('/trainings',uploadTraining.single('file'),(req,res)=>{
        const certificateFileName = req.file.filename;   
        const {tCourse,tCompany,tCompanyWebsite,tYear} = req.body;
        db('trainings').insert({  
                course: tCourse,
                company:tCompany, 
                companywebsite:tCompanyWebsite,                 
                certificate: certificateFileName,
                year: tYear              
        })
        .then(data=>{     
                return  res.json("Training added");
        })  
        .catch(err=>res.status(400).json('Training not added'))   
 })


// SKILL
// Get Skills
app.get('/skills',(req,res)=>{
        return  db.select('*').from('skills')
        .then(data=>{     
          res.json(data);
        })
        .catch(err=>res.status(400).json('No skill added by this time')) 
})

// Delete Skill
app.delete('/skills/:id',(req,res)=>{
        db.delete('*').from('skills')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("Skill deleted");
        })
        .catch(err=>res.status(400).json('Skill not deleted')) 
})
//  Add Skills
app.post('/skills',(req,res)=>{
        const skill = req.body;
       if(!skill){
               res.status(400).json('Skill not recieved');
               return;
        }
       db('skills').insert(skill)
       .then(skillx=>{
               return   res.json('Skill added')
       })
       .catch(err=>res.status(400).json('Skill not added'))
})

//PUBLIC MESSAGE
// Get Public Message
app.get('/pmessages',(req,res)=>{
        return  db.select('*').from('pmessages')
        .then(data=>{     
          res.json(data);
        })
        .catch(err=>res.status(400).json('No alert/notification message added by this time')) 
})

// Delete public message
app.delete('/pmessages/:id',(req,res)=>{
        db.delete('*').from('pmessages')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("Message deleted");
        })
        .catch(err=>res.status(400).json('Message not deleted')) 
})

//  Add public message
app.post('/pmessages',(req,res)=>{
        const pmessage = req.body;
       if(!pmessage){
               res.status(400).json('Message not recieved');
               return;
        }
       db('pmessages').insert(pmessage)
       .then(message=>{
               return   res.json('Message added')
       })
       .catch(err=>res.status(400).json('Message not added'))
})

// PROFILE
// Get Profile
app.get('/profiles',(req,res)=>{
        return  db.select('*').from('profiles')
        .then(data=>{     
          res.json(data);
        })
        .catch(err=>res.status(400).json('No profile summary added by this time')) 
})

// Delete Profile
app.delete('/profiles/:id',(req,res)=>{
        db.delete('*').from('profiles')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("profile deleted");
        })
        .catch(err=>res.status(400).json('profile not deleted')) 
})
//  Add Profile
app.post('/profiles',(req,res)=>{
        const profile= req.body;
       if(!profile){
               res.status(400).json('Profile not recieved');
               return;
        }
       db('profiles').insert(profile)
       .then(profile=>{
               return   res.json('Profile added')
       })
       .catch(err=>res.status(400).json('Profile added'))
})

// Update Profile
app.put('/profiles',(req,res)=>{
        const profile = req.body;
        db('profiles').update(profile)
        .then(profile=>{
                return   res.json('Profile updated')
        }) 
        .catch(err=>res.status(400).json('Not added')) 
})

// HOBBY
// Get Hobbies
app.get('/Hobbies',(req,res)=>{
        return  db.select('*').from('hobbies')
        .then(data=>{     
          res.json(data);
        })
        .catch(err=>res.status(400).json('No hobby added by this time')) 
})

// Delete Skill
app.delete('/hobbies/:id',(req,res)=>{
        db.delete('*').from('hobbies')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("Hobby deleted");
        })
        .catch(err=>res.status(400).json('Hobby not deleted')) 
})
//  Add Skills
app.post('/hobbies',(req,res)=>{
        const hobby = req.body;
       if(!hobby){
               res.status(400).json('Hobby not recieved');
               return;
        }
       db('hobbies').insert(hobby)
       .then(hobby=>{
               return   res.json('Hobby added')
       })
       .catch(err=>res.status(400).json('Hobby added'))
})

// PHONE
// Get Phonenumbers
app.get('/phone',(req,res)=>{
        return  db.select('*').from('phone')
        .then(data=>{     
          res.json(data);
        })
        .catch(err=>res.status(400).json('No phone number added by this time')) 
})

// Delete Phone
app.delete('/phone/:id',(req,res)=>{
        db.delete('*').from('phone')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("Phone deleted");
        })
        .catch(err=>res.status(400).json('Phone not deleted')) 
})

// Add Phonenumber
app.post('/phone',(req,res)=>{
        const phone = req.body;
       if(!phone){
               res.status(400).json('Phone number not received');
               return;
       }
       db('phone').insert(phone)
       .then(phone=>{
              return res.json('Phone number added')
       })
       .catch(err=>res.status(400).json('Phone number not added'))  
})


// MESSSAGE
// Get Received Messages
 app.get('/messages',(req,res)=>{
        return  db.select('*').from('messages')
        .then(data=>{     
          res.json(data);
        })
        .catch(err=>res.status(400).json('No message received added by this time')) 
})

// Delete Message
app.delete('/messages/:id',(req,res)=>{
        db.delete('*').from('messages')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("Message deleted");
        })
        .catch(err=>res.status(400).json('Message not deleted')) 
})

app.get('/messages/:id',(req,res)=>{
      return  db.select('*').from('messages')
        .where({id:req.params.id})
        .then(data=>{     
          res.json("Item gotten");
        })
        .catch(err=>res.status(400).json('Can not get item')) 
})

// Recieve a message
 app.post('/messages',(req,res)=>{//Add Clothings
        const {name,email,phone,companyName,subject,message} = req.body;
        db('messages').insert({  
                name: name,                 
                email: email,
                phone:phone,
                companyname:companyName,
                subject:subject,
                message: message                
        })
        .then(messages=>{
                return   res.json('Message sent')
        }) 
})


// LOGIN
// Admin Login
//Get Login
app.post('/login',(req,res)=>{
        const {email,hash} = req.body;
        db.select('password').from('register')
        .where({email:email})
        .then(password=>{       
                if(password==hash){
      return  db.select('*').from('register')
        .where({email:email}).then(
            user=>{
                    res.json(user[0])
            }
        )				
    }else{
        res.status(400).json('Not found')
                        }
        }).catch(err=>res.status(400).json('erro getting user'))
})


//Get register
app.get('/register',(req,res)=>{
        return  db.select('email','password').from('register')
        .then(data=>{     
          res.json(data);
        }) 
        .catch(err=>res.status(400).json('No admin registered added by this time')) 
})

//Add register
app.post('/register',(req,res)=>{
        const {name, email, maidenName, hash} = req.body;
        db('register').insert({  
                name: name,                 
                email: email,
                maidenname : maidenName,
                password : hash              
        })
        .then(messages=>{
                return   res.json('Registered')
        }) 
})

//Update user
app.put('/register',(req,res)=>{

        const {email, maidenName,hash} = req.body;        

        db.select('maidenname').from('register')
        .where({email:email})
        .then(maidenNamex=>{          
            if(maidenNamex[0].maidenname==maidenName){
                db('register').update({  
                password : hash})
                .where({email:email,maidenname:maidenName})
                .then(data=>{     
                        if(data){
                                return res.json('Admin password updated');
                        } 
                        else{
                                return  res.json('Admin password not updated');
                        }        
                 })
                }
            else{ 
                        db.select('email','maidenname').from('register')
                        .where({email:email})
                        .then(data=>{ 
                                const messageTemplate = 
                                        `<h1>Password Recovery</h1>
                                        <p>Your recovery datails are:
                                        <br/>
                                        <br/>Email: ${data[0].email},
                                        <br/>Maiden Name: ${data[0].maidenname}.
                                        <br/>
                                        <br/>
                                        Thanks.
                                        </p>
                                        `;

                        const transporter = nodeMailer.createTransport({
                               
                                service:'gmail',
                                host:'smtp.gmail.com',
                                port:465,
                                secure:true,
                                auth:{
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
                               subject:'Password Recovery',
                               html:messageTemplate
                        })
                        const sendMail = async (transporter, info) =>{
                                try{
                                        await transporter.sendMail(info);
                                        res.json("Login Details sent your your email")
                                }
                                catch(error){
                                res.json("Check your email or make sure your network connection is good")
                                }
                        }
        
                        sendMail(transporter,info);
                        })
                        .catch(err=>res.status(400).json('You are not the admin'))
                }
                }).catch(err=>res.status(400).json('erro getting user'))   			  
    }    
)

// Get Cv
app.get('/cvs',(req,res)=>{     
        return  db.select('*').from('cvs')
        .then(data=>{   
          res.json(data);
        })
        .catch(err=>res.status(400).json('No CV added by this time'))  
})

//Add CV
const storageCv = multer.diskStorage({
        destination:(req,file,cd)=>{
                cd(null,'public/CV_images')
        },
        filename:(req,file,cd)=>{
                cd(null, `${Date.now()}_${file.originalname}`)
        }
})

const uploadCv = multer({storage:storageCv});

app.post('/cvs',uploadCv.single('cv'),(req,res)=>{
        const cv = req.file.filename;   
        db('cvs').insert({cv:cv})
        .then(photo=>{
                return   res.json('CV uploaded')
        }) 
})

// Delete CV
app.delete('/cvs/:id',(req,res)=>{
        db.select('cv').from('cvs')
        .where({id:req.params.id})
        .then(data=>{  
        fs.unlinkSync(`public/CV_images/${data[0].cv}`) //deleting file from folder
        }) 

        db.delete('*').from('cvs')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("CV deleted");
        })
        .catch(err=>res.status(400).json('CV not deleted')) 
})

// Get photo
app.get('/photos',(req,res)=>{     
        return  db.select('*').from('photos')
        .then(data=>{   
          res.json(data);
        }) 
        .catch(err=>res.status(400).json('No Photo added by this time')) 
})

//Add Photo
const storagePhotos = multer.diskStorage({
        destination:(req,file,cd)=>{
                cd(null,'public/photo_images')
        },
        filename:(req,file,cd)=>{
                cd(null, file.fieldname + '_' + 
                Date.now() + path.extname(file.originalname))
        }
})

const upload = multer({storage:storagePhotos});

app.post('/photos',upload.single('photo'),(req,res)=>{
        const photo = req.file.filename;   
        db('photos').insert({photo:photo})
        .then(photo=>{
                return   res.json('Photo added')
        }) 
})

// Delete Photo
app.delete('/photos/:id',(req,res)=>{
        db.select('photo').from('photos')
        .where({id:req.params.id})
        .then(data=>{ 
        fs.unlinkSync(`public/photo_images/${data[0].photo}`) //deleting file from folder
        }) 

        db.delete('*').from('photos')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("Photo deleted");
        })
        .catch(err=>res.status(400).json('Photo not deleted')) 
})


const PORT = process.env.PORT
app.listen(PORT||3002,function(){
console.log(`Sever running at port: ${PORT}`);
});


// app.listen(3002,function(){
// console.log('Sever running at port: 3002');
// });

       