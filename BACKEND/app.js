import express from 'express'
import cors from 'cors'
import { userSignupData, loginCredentials, getUserDetailsOfUser, getAllImages, getUserImage, deleteImages }from './controllers/userControllers.js'
import multer from 'multer'
import bodyParser from 'body-parser'




const app = express()
app.use(express())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'));


app.post('/', cors(), userSignupData)

app.post('/login', cors(), loginCredentials)

//storing the image

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })

  const upload = multer({ storage: storage })

app.post('/users/add', upload.single('image'), getUserImage)

//posting the image

/*app.get('/getUserData', getAllUser)*/
//userpage data
app.post('/userPage', cors(), getUserDetailsOfUser)

//get images
app.post('/image', getAllImages) 

//for deleting the image
app.post("/deleteImage", cors(), deleteImages)




app.listen(8000, ()=> console.log('Listening to the port 8k...'))