#!/bin/sh

# Optional: Wait for the database to be ready (you can remove if not needed)
# echo "Waiting for PostgreSQL..."
# while ! nc -z db 5432; do sleep 1; done

echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn server..."
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
