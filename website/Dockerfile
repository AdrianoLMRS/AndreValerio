FROM node:lts-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copy files to the container
COPY . .

RUN npm run build

FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080