import { loginUser, registerUser } from '../services/authService.js';

async function register(req, res) {
  try {
    const result = await registerUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const result = await loginUser(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

export {
  register,
  login
};