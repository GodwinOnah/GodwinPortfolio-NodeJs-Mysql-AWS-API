import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//connecting to database using knex
const db = knex({    
        client: 'pg',
        connection:{
        host :'127.0.0.1',
        user:'godwinonah',
        password:'',
        database:'GodwinPortfolio'
        }
});
// brew start psql
// createdb 'GodwinPortfolio'
// psql 'GodwinPortfolio'
// \l
// \d
// CREATE TABLE projects (id serial primary key, projecttitle VARCHAR, projectdescription text, projectlink VARCHAR, githubname VARCHAR);
// CREATE TABLE skills (id serial primary key,skill VARCHAR);
// CREATE TABLE messages (id serial primary key, name text, email varchar, phone Varchar, companyname VARCHAR, subject varchar, message varchar);
// CREATE TABLE register (id serial primary key,name  VARCHAR, email  VARCHAR,maidenname  VARCHAR,password  VARCHAR);
// CREATE TABLE login (loginStatus  boolean);
// insert into login (loginstatus) values(false);
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
        const {projectTitle,projectDescription,gitHubLink,projectLink} = req.body;
        db('projects').insert({  
                projecttitle: projectTitle,                 
                projectdescription: projectDescription,
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
})
// Delete Training
app.delete('/trainings/:id',(req,res)=>{
        db.delete('*').from('trainings')
        .where({id:req.params.id})
        .then(data=>{     
                return res.json("Training deleted");
        })
        .catch(err=>res.status(400).json('Training not deleted')) 
})

// Add training
const storageTraining = multer.diskStorage({
        destination:(req,file,cd)=>{
                cd(null,'public/certificates')
        },
        filename:(req,file,cd)=>{
                cd(null, file.originalname)
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
app.put('/profiles',(req,res)=>{//Add Clothings
        const profile = req.body;
        db('profiles').update(profile)
        .then(profile=>{
                return   res.json('Profile updated')
        }) 
})

// HOBBY
// Get Hobbies
app.get('/Hobbies',(req,res)=>{
        return  db.select('*').from('hobbies')
        .then(data=>{     
          res.json(data);
        })
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
app.put('/login',(req,res)=>{                           
        const loginStatus = req.body;
        db('login').update({  
                loginstatus:!loginStatus                               
        })
        .then(data=>{
                return   res.json('logged in')
        }) 
})  

app.get('/login',(req,res)=>{
        return  db.select('*').from('login')
        .then(data=>{     
          res.json(data);
        })
})


app.get('/register',(req,res)=>{//Add Clothings
        return  db.select('*').from('register')
        .then(data=>{     
          res.json(data);
        }) 
})

app.post('/register',(req,res)=>{//Add Clothings
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

app.put('/register',(req,res)=>{//Add Clothings
        const {id,email, maidenName,hash} = req.body;
        db('register').update({  
                password : hash})
                .where({id:id,email:email,maidenname:maidenName})
        .then(messages=>{
                return   res.json('Admin updated')
        }) 
})

// Get photo
app.get('/photos',(req,res)=>{     
        return  db.select('*').from('photos')
        .then(data=>{   
          res.json(data);
        }) 
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


// const DATABASE_URL = process.env.DATABASE_URL
// app.listen(DATABASE_URL||3003,function(){
// console.log(`Sever running at port: ${DATABASE_URL}`);
// });

app.listen(3002,function(){
        console.log('Sever running at port:3002');
 });
       