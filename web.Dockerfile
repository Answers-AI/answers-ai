# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=21
ARG PNPM_VERSION=8.15.3

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base
# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

# Set working directory for all build stages.
WORKDIR /app

################################################################################
FROM base as builder

RUN yarn global add turbo

#RUN apk add g++ make python3 build-base gcc
#RUN npm install node-gyp -g

################################################################################
# Create a stage for installing production dependecies.
FROM base as deps
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them
# into this layer.

COPY apps/web/package.json apps/web/package.json
COPY apps/inngest-worker/package.json apps/inngest-worker/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/tsconfig/package.json packages/tsconfig/package.json
COPY packages/eslint-config-custom/package.json packages/eslint-config-custom/package.json
COPY packages/eslint-config-custom-server/package.json packages/eslint-config-custom-server/package.json
COPY packages/experimental-prisma-webpack-plugin/package.json packages/experimental-prisma-webpack-plugin/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/utils/package.json packages/utils/package.json
COPY package.json package.json
COPY pnpm-workspace.yaml pnpm-workspace.yaml
COPY pnpm-lock.yaml pnpm-lock.yaml


RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install  


################################################################################
# Create a stage for building the application.
FROM deps as build

# Copy the rest of the source files into the image.
COPY  . .

# Run the build script.
# RUN pnpm run build #TODO: The build is ran automaticall



################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a non-root user.
#USER node

# Copy package.json so that package manager commands can be used.
#COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=build /app/ ./
COPY --from=build /app/node_modules/.cache/turbo node_modules/.cache/turbo

RUN yarn global add turbo

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.

CMD pnpm start
