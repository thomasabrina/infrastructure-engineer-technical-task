# Use the official Node.js image as a base
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript application
RUN npm run build

# Expose the application port (change if necessary)
EXPOSE 3000

# Command to run the application
CMD ["node", "build/index.js"]

# Health check
HEALTHCHECK CMD curl --fail http://localhost:3000/health || exit 1
