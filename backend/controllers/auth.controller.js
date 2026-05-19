const AppError = require("../errors/AppError")
const bcrypt = require('bcrypt')
const UnauthorizedError = require("../errors/UnauthorizedError")
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/user.repository')
const { sendWelcomeEmail, sendResetPasswordMail } = require("../services/mail.service")
const crypto = require('crypto')

const authController = {
  register,
  login,
  refresh, 
  logout,
  resetPassword
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
    
    sendWelcomeEmail(email, name)
    
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


async function forgotPassword(req, res, next){
 
  const {email} = req.body

  try{
    const token = crypto.randomBytes(32).toString('hex')
    const expiryDate = new Date(Date.now()+ 60 * 60 * 1000) //+1h
    
    await userRepository.saveResetToken(token, expiryDate)
  
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`
    await sendResetPasswordMail(email, resetUrl)
  
    res.status(200).json({message: 'Vous avez reçu un email de réinitialisation'})
  }catch(err){
    next(err)
  }
}


async function resetPassword(req, res, next){
  try{
    const { token, password } = req.body

    const user = await userRepository.findByResetToken(token)
    if (!user) throw new AppError('Lien invalide', 400)

    const isExpired = new Date(user.reset_token_expiry) < new Date();
    if(isExpired) throw new AppError('Le lien a expiré faites une nouvelle demande', 400)

    const saltRound= 10
    const hashpassword = await bcrypt.hash(password, saltRound)

    await userRepository.updatePassword(user.id, hashpassword)

    res.status(200).json({message : 'Mot de passe mis à jour avec succès'})

  }catch(err){
    next(err)
  }
}




module.exports=authController