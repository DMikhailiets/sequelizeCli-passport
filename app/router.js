const {Router} = require('express')
const UserController = require('./controllers/userController')

const router = Router()
const userController = new UserController()

router.post('/user', userController.createUser)
router.delete('/user', userController.delete)
router.get('/user/:id', userController.getUserData)
router.put('/user', userController.updatePassword)

module.exports = router