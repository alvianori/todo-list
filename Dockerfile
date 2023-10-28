# Gunakan node.js sebagai base image
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh aplikasi Anda ke dalam container
COPY . .

# Expose port yang digunakan oleh aplikasi Node.js
EXPOSE 8081

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]
