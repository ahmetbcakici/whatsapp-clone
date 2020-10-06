import jwt from 'jsonwebtoken';

import { api } from '../../config'

export default async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return next('UNAUTHORIZED')
  try {
    const verifiedToken = await jwt.verify(token, api.jwtSecretKey);
    req.user = verifiedToken.user;
    if (req.path === '/') return res.send(req.user)

    return next();
  } catch (e) {
    return next('INVALID_TOKEN')
  }
};