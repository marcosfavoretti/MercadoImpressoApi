
FROM node:18.16 as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18.16
WORKDIR /app
COPY package.json .
RUN npm install --only=productions
COPY --from=build /app/dist ./dist
COPY .env .
CMD ["npm", "run", "start:prod"]