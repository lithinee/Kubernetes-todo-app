#  Node.js image from Docker Hub
FROM node:18

# setting a working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json 
COPY package*.json ./

# backend dependencies
RUN npm install

COPY . .

# Expose port 3001 to the outside world
EXPOSE 3001

# Define the command to run the server
CMD ["node", "index.js"]


