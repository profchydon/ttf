# FROM node:18-alpine as base

# # install openssl as it is required for prisma
# RUN apk update
# RUN apk add openssl
# RUN apk add chromium

# WORKDIR /usr/src/app/

# COPY    package.json \
#     prisma/ \
#     ./

# RUN yarn cache clean
# RUN rm -rf yarn.lock node_modules

# RUN yarn install

# # RUN curl -sf https://gobinaries.com/tj/node-prune | sh
# # RUN node-prune

# FROM base AS dev
# COPY  nest-cli.json \
#     tsconfig.* \ 
#     # *env \
#     ./

# # bring in src and prisma from context
# COPY ./src/ ./src
# COPY ./prisma/ ./prisma

# # install openssl as it is required for prisma
# RUN apk update
# RUN apk add openssl
# RUN apk add chromium

# # Install dependencies
# RUN yarn
# RUN yarn build
# RUN npx prisma generate

# # use one of the smallest images possible
# FROM node:18-alpine  as production


# # get package.json from base
# COPY --from=base /usr/src/app/ ./
# # get the dist back
# COPY --from=dev /usr/src/app/dist/ ./dist/
# # COPY --from=dev /usr/src/app/.env ./.env
# # COPY --from=dev /usr/src/app/prisma ./prisma

# # get the node_modules from the intial cache
# # COPY --from=base /usr/src/app/node_modules/ ./node_modules/

# # expose application port 
# EXPOSE 3800

# # Specify timezone for all containers
# # RUN echo "Africa/Lagos" > /etc/timezone 
# # RUN dpkg-reconfigure -f noninteractive tzdata

# RUN apk add --no-cache tzdata
# ENV TZ=Africa/Lagos

# # start
# CMD npx prisma migrate deploy ; node --max-http-header-size 50000 dist/main.js 
# # CMD [ "yarn", "run", "start:dev" ]

# Use a Node.js Alpine-based image for the development stage
# FROM node:18-alpine

# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Copy application dependency manifests to the container image
# COPY package*.json ./

# # Install application dependencies using `npm install`
# RUN npm install

# # Copy the rest of the application code to the container
# COPY . .

# # Build the application (if needed)
# RUN npm run build

# # Define the command to start your application in development mode
# ENTRYPOINT ["/bin/sh", "-c", "npm run start:dev"]

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json .

COPY tsconfig.* .

COPY prisma .

RUN yarn install

RUN yarn upgrade

RUN yarn build

RUN npx prisma generate

COPY . .

EXPOSE 3800

CMD npx prisma migrate deploy ; node --max-http-header-size 50000 dist/main.js 