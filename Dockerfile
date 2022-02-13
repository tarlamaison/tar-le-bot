FROM node:lts

# Creating workdir
RUN mkdir -p /usr/tar-le-bot
WORKDIR /usr/tar-le-bot

# Copying package file
COPY package.json .
RUN npm install

# Copying sources
COPY src/ ./src
COPY contracts/ ./contracts
COPY providers/ ./providers
COPY start/ ./start
COPY factory.ts .

# Copying assets
COPY *.json ./

RUN ls -lah
RUN npm run build
CMD ["npm", "run", "start"]