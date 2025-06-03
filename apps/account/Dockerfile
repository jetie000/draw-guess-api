FROM node:23-alpine AS development

WORKDIR /usr/src/app

COPY dist ./dist

FROM node:23-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production --omit=dev

COPY libs/src/prisma ./libs/src/prisma

RUN apk add --no-cache openssl

RUN npx prisma generate

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:migrate:prod:account"]
