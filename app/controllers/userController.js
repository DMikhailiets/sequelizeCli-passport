const { User } = require('../database/models/')
const { hash } = require('bcrypt')

class UserController {
    createUser = async (req, res) => {
        try {
            const { email, userName, password } = req.body
            const duplicate = await User.findOne({ where: { email }})
            if (!duplicate) {
                const hashedPassword = await hash(password, 12)
                const user = {
                    email,
                    userName,
                    password: hashedPassword
                }
                await User.create(user)   
                return res.json({
                    message: 'user was created'
                })
            } else {
                return res.status(403).json({
                    message: 'This email already exist in the system'
                })
            }
        } catch (err) {
            console.log(err.message)
            res.status(401).json({
                message: err.message
            })
        }
    }
    delete = async (req,res) => {
        const {email} = req.body 
        try {
            const response = await User.destroy({where: {email}})
            if (response) {
                return res.json({
                    message: `Useer with email ${email} was deleted`
                })   
            } else {
                return res.status(404).json({
                    message: `User with email ${email} does not exist`
                })
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
    getUserData = async (req,res) => {
        const id = req.params.id
        console.log(id)
        try {
            const response = await User.findOne({
                attributes: ['email', 'userName'],
                where: {id}
            })
            if (response) {
                return res.json({
                    data: response
                })
            } else {
                return res.status(404).json({
                    message: "user not found"
                })
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
    updatePassword = async (req,res) => {
        const {email, password} = req.body
        const hashedPassword = await hash(password, 12)
        try {
            const response = await User.update({ password: hashedPassword }, {
                where: {
                  email
                }
              });
            if (response) {
                return res.json({
                    message: 'Password was updated'
                })
            } else {
                return res.status(403).json({
                    message: 'user not found'
                })
            }
        } catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = UserController