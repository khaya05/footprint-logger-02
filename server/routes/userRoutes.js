import {Router} from 'express';
const router = Router()

router.get('/current-user', (req, res) =>{
  res.status(200).json({message: 'User'})
})

export default router