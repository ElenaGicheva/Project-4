from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=20, null=False, default=None)
    email = models.CharField(max_length=35, null=False, default=None)

    def __str__(self):
        return f"{self.username}"
