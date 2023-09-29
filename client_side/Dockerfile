#use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm i react-scripts


# Copy the rest of the app's files to the working directory
COPY . .

# Expose the port the app runs on 3765
EXPOSE 3765

# Start the app
CMD ["npm", "start"]
