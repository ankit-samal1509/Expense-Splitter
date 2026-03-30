import * as service from '../services/authService.js'

export const register = async (req, res, next) => {
  try {
    const data = await service.register(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const data = await service.login(req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const user = await service.getProfile(req.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
}