import express from 'express'
import { userSignupData, getAllUser } from '../controllers/userControllers.js'


const router = express.Router()

router.route('/').post(userSignupData).get(getAllUser)

export default router