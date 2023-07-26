FROM node:18-alpine

COPY . .

RUN yarn
RUN yarn build

USER 1001
EXPOSE 8080
CMD ["yarn", "start"]
