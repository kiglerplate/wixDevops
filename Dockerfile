# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Install Chromium and dependencies required for Puppeteer to work
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set environment variables for Puppeteer to run in a containerized environment
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY app.js .

# Expose the port the app will listen on
EXPOSE 8080

# Define the command to run when the container starts
CMD ["node", "app.js"]
