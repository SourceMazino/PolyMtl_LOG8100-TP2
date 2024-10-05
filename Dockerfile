FROM node:8.12.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9090

# Démarrer l'application
CMD ["npm", "start"]
