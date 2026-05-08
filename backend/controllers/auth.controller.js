const AppError = require("../errors/AppError")
const bcrypt = require('bcrypt')
const UnauthorizedError = require("../errors/UnauthorizedError")
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/user.repository')

const authController = {
  register,
  login,
  refresh, 
  logout
}

const COOKIE_OPTIONS = {
  httpOnly:true, 
  secure: process.env.NODE_ENV === 'production',
  sameSite:'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
}

function generateTokens(payload){
    const accessToken=jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '15m'}
    )

    const refreshToken=jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7D'}
    )

    return { accessToken, refreshToken }
}

async function register(req, res, next){
  try {

    const {email, password, name} = req.body

    if(!email || !password) throw new AppError('email ou mot de passe manquant', 400)

    const userExists = await userRepository.findByEmail(email)
    if (userExists) throw new AppError('La personne existe déjà', 409) 
    
    const saltRound= 10
    const hashpassword = await bcrypt.hash(password, saltRound)

    const user = await userRepository.create({email, password : hashpassword, name, creation_date : Date.now() })
    res.status(201).json({message: 'Utilisateur créé'})

  }catch(error){
    next(error)
  }
}


async function login(req, res, next){
  try {
    const { email, password } = req.body
    if(!email || !password) throw new AppError('nom ou mot de passe manquant', 400)

    const user = await userRepository.findByEmail(email)

    if(!user) throw new UnauthorizedError('email ou mot de passe invalide')

    const isValid = bcrypt.compare(password, user.password)

    if(!isValid) throw new UnauthorizedError('email ou mot de passe invalide')
    
    // const accessToken=jwt.sign(
    //   {id : user.id},
    //   process.env.JWT_SECRET,
    //   { expiresIn: '15m'}
    // )

    // const refreshToken=jwt.sign(
    //   {id : user.id},
    //   process.env.JWT_REFRESH_SECRET,
    //   { expiresIn: '7D'}
    // )
    const { accessToken, refreshToken } = generateTokens({ id : user.id, name:user.name})

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
    res.status(200).json({accessToken})
  }catch(error){
    next(error)
  }
}

async function refresh(req, res, next){
  try {
    const refreshTokenOld = req.cookies.refreshToken
    if (!refreshTokenOld) throw new UnauthorizedError('Refresh token manquant')

    let payload
    try{
      payload = jwt.verify(refreshTokenOld, process.env.JWT_REFRESH_SECRET) 
    } catch {
      throw new UnauthorizedError('Refresh token invalide ou expiré');
    }

    const user= await userRepository.findById(payload.id)
 
    // const accessToken=jwt.sign(
    //   {id : user.id},
    //   process.env.JWT_SECRET,
    //   { expiresIn: '15m'}
    // )

    // const refreshToken=jwt.sign(
    //   {id : user.id},
    //   process.env.JWT_REFRESH_SECRET,
    //   { expiresIn: '7D'}
    // )

    const { accessToken, refreshToken } = generateTokens({ id : user.id})

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
    res.status(200).json({accessToken})

  }catch(error){
    next(error)
  }
}

async function logout(req, res) {
  res.clearCookie('refreshToken', COOKIE_OPTIONS);
  res.json({ message: 'Déconnecté' });
}

module.exports=authController