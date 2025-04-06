# Use official Python image
FROM python:3.13.2-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y build-essential libpq-dev curl \
    && apt-get clean

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Run migrations and start the app with Gunicorn
# Start Django server
# Run migrations before starting the server, with fallback for 'users' app
CMD ["sh", "-c", "python manage.py makemigrations users || python manage.py makemigrations && python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:8000"]

# Use official Python slim image
FROM python:3.13.2-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y build-essential libpq-dev curl netcat \
    && apt-get clean

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Make start script executable
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose port 8000
EXPOSE 8000

# Run start script
CMD ["/start.sh"]
