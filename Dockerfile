FROM node:16-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm install --legacy-peer-deps
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start"]
