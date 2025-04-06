# Use official Python image
FROM python:3.13.2

# Set the working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8000

# Start Django server
# Run migrations before starting the server, with fallback for 'users' app
CMD ["sh", "-c", "python manage.py makemigrations users || python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]