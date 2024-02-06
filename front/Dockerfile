ARG NODE_VERSION=18.16.0
ARG PNPM_VERSION=8.6.10

# BUILD
FROM node:${NODE_VERSION}-alpine as build-stage

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

RUN chown -R node:node /usr/src/app

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY .. .



# Run the application.
RUN pnpm build

# PRODUCTION
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]