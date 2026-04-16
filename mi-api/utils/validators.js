function normalizeCredentials(payload = {}) {
  return {
    email: typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '',
    password: typeof payload.password === 'string' ? payload.password : ''
  };
}

function validateRegisterData(email, password) {
  if (!email || !password) {
    throw createError('Email y contrasena son requeridos.', 400);
  }

  if (!email.includes('@') || password.length < 6) {
    throw createError('Correo invalido o contrasena muy corta (minimo 6 caracteres).', 400);
  }
}

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export {
  normalizeCredentials,
  validateRegisterData
};