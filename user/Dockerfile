FROM nginx:alpine

# Remove default Nginx web files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static frontend files
COPY . /usr/share/nginx/html

EXPOSE 80
