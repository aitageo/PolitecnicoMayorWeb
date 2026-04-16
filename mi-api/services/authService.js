import User from '../models/User.js';
import { hashPassword } from '../utils/hash.js';
import { normalizeCredentials, validateRegisterData } from '../utils/validators.js';

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function registerUser(credentials) {
  const { email, password } = normalizeCredentials(credentials);
  validateRegisterData(email, password);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError('Ya existe una cuenta con ese correo.', 409);
  }

  const user = new User({
    email,
    password: hashPassword(password)
  });

  await user.save();

  return {
    message: 'Cuenta creada correctamente.',
    email: user.email
  };
}

async function loginUser(credentials) {
  const { email, password } = normalizeCredentials(credentials);

  if (!email || !password) {
    throw createError('Email y contrasena son requeridos.', 400);
  }

  const user = await User.findOne({ email });
  if (!user || user.password !== hashPassword(password)) {
    throw createError('Correo o contrasena incorrectos.', 401);
  }

  return {
    message: 'Login exitoso.',
    email: user.email
  };
}

export {
  registerUser,
  loginUser
};