FROM node:22-alpine

WORKDIR /user

COPY package*.json ./

RUN npm install

COPY . .

 
EXPOSE 3000
EXPOSE 4000
CMD [ "npm", "run", "dev" ]

