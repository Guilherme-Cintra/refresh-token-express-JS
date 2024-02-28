import express from 'express'; // Importation de express
import 'dotenv/config';
import { sequelize } from './config/config.js';
import router from './src/routes/auth.js';

const app = express();
app.use(express.json());

app.use('/api', router)
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}. Accedez directement sur ...`)); // Démarrage du serveur 
  }); 