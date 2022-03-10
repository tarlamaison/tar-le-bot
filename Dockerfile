FROM node:lts

WORKDIR /home/tarlebot

# Copying sources
COPY . .

RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
