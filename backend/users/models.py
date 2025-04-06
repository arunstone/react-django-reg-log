from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add custom fields if needed
    pass

    class Meta:
        # Add unique related_name to avoid conflicts
        swappable = 'AUTH_USER_MODEL'

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',  # Avoid conflict with 'auth.User.groups'
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',  # Avoid conflict with 'auth.User.user_permissions'
        blank=True
    )
