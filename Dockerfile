FROM node:16.14.2-alpine3.15 as builder
WORKDIR /app
ADD . .
RUN npm install
RUN npx prisma db push
EXPOSE 9876

CMD ["npm","run","start"]
