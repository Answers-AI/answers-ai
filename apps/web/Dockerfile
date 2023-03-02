FROM node:18

# Create app directory
WORKDIR /app

RUN npm install -g pnpm turbo

# Install app dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "pnpm", "dev" ]

