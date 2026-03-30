import express from 'express'
import { getAllGroups, getGroupById, createGroup, deleteGroup } from '../controllers/groupController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(protect) 

router.get('/', getAllGroups)
router.get('/:id', getGroupById)
router.post('/', createGroup)
router.delete('/:id', deleteGroup)

export default router