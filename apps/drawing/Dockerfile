FROM node:23 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build drawing

FROM node:23 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY libs/src/prisma ./libs/src/prisma

RUN npx prisma generate

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod:drawing"]
