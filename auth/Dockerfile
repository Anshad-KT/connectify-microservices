FROM node:22-alpine

WORKDIR /user

COPY package*.json ./

RUN npm install

COPY . .

# Environment variables are provided via Kubernetes (Secrets/ConfigMaps)

EXPOSE 3000
EXPOSE 4000

CMD [ "npm", "run", "dev" ]
