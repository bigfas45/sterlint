# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the application
RUN npm run build --prod

# Set the environment variable
ENV PORT=3000

# Expose port 3000 to the host
EXPOSE 3000

# Start the application
CMD [ "npm", "start", "--host", "0.0.0.0" ]


