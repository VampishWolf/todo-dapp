FROM --platform=linux/amd64 node:20-alpine as base

FROM base AS deps
WORKDIR /app

COPY package.json yarn.lock ./
# BUILD DEPS
FROM base AS builder

# Install dependencies
RUN yarn install --frozen-lockfile
WORKDIR /app

COPY . .

# Copy the smart-contracts folder into the Docker container
COPY ./smart-contracts /app/smart-contracts

RUN yarn build

EXPOSE 3000


CMD ["yarn", "start"]
