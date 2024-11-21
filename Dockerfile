FROM node:20

WORKDIR /app


COPY package*.json ./
RUN npm install

COPY . .

ARG env_variable
ENV NODE_ENV=$env_variable

RUN npm run build
EXPOSE 8080

CMD ["npm", "run", "start:prod"]
