# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy Google Cloud Credentials File
COPY gcloud-credentials/nodetalk-24565-e37341a09bca.json /app/gcloud-credentials.json

# Copy the .env file
COPY .env .env

# Set Environment Variable (Use the correct path)
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/gcloud-credentials.json"

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
