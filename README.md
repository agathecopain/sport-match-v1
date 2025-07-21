# SportMatch - CCP2 eval project
Présentation du projet


## Lancement du projet (How To Run)
Créer un dossier `sportMatch/server/config.env` et configurer les variables d'environnement Atlas URI et PORT du serveur (file creation and .env config):
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/
PORT=5050
```

Démarrer le serveur (start server):
```
cd sportMatch/server
npm install
npm start
```

Démarrer le serveur web (start web server)
```
cd sportMatch/front-end
npm install
npm run dev
```
