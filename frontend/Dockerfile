# Use official Node image
FROM node:22.14.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build the React app
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
