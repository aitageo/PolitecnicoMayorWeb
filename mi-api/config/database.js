import mongoose from 'mongoose';

async function connectDatabase(mongoUri) {
  if (!mongoUri) {
    console.warn('MONGODB_URI no esta definido. Ejecutando sin MongoDB.');
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      family: 4
    });
    console.log('MongoDB conectado correctamente.');
    return true;
  } catch (error) {
    console.error('No se pudo conectar a MongoDB:', error.message);
    return false;
  }
}

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

export {
  connectDatabase,
  isDatabaseConnected
};