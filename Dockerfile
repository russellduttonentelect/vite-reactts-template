ARG DOCKER_REGISTRY=""
ARG NODE_VERSION=16
ARG NPM_VERSION=8

FROM node:${NODE_VERSION}-alpine AS development

# Assert that our apps working directory exists and that we own it
RUN mkdir -p /app \
    && chown node -R /app
WORKDIR /app

FROM development as base

RUN apk --no-cache add curl \
  && npm i -g npm@${NPM_VERSION} \
  && npm install -g serve

USER node

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node ./package*.json ./
COPY --chown=node:node ./.npmrc ./

RUN CYPRESS_INSTALL_BINARY=0 npm ci --quiet

# Copy in app contents
COPY --chown=node:node . .

RUN npm run build

CMD ["serve", "-l", "3000", "-s", "build"]

# Configure TEST runner, which will run tests as a build validation step

FROM node:${NODE_VERSION}-alpine AS tester

ENV NODE_ENV=ci
ENV CI=true

RUN mkdir -p /app
RUN mkdir /app/coverage
WORKDIR /app

USER node

COPY --chown=node:node --from=base /app /app

# Run Tests
RUN npm run lint 
# && npm run test:ci
# Audit Packages
# Changed this after react-scripts introduced unfixable dependencies and was moved to be a dev dependencies
RUN npm audit --omit=dev

CMD ["npm", "start"]

# Configure PRODUCTION image, with lean dependencies and compiled JS.

FROM nginx:1.23.1-alpine AS production

# Uncomment below to remove all nginx static assets
# RUN rm -rf ./*

COPY --from=base /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]