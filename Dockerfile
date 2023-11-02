ARG DOCKER_REGISTRY=""
ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine AS development

# Assert that our apps working directory exists and that we own it
RUN mkdir -p /app \
    && chown node -R /app
WORKDIR /app

USER node

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node ./package*.json ./
COPY --chown=node:node ./.npmrc ./

RUN CYPRESS_INSTALL_BINARY=0 npm ci --quiet

# Copy in app contents
COPY --chown=node:node . .

RUN npm run build

# Configure PRODUCTION image, with lean dependencies and compiled JS.
FROM nginx:1.23.1-alpine AS production

COPY --from=development /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose the port that nginx uses (default is 80)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
