from django.db import models

# Create your models here.


class Destination(models.Model):
    name = models.CharField(max_length=50, default=None)
    price = models.PositiveIntegerField(default=None)
    duration = models.PositiveIntegerField(default=None)
    ability_level = models.CharField(max_length=20, default=None)
    image = models.CharField(max_length=500, default=None)
    background_image = models.CharField(max_length=500, default=None)
    description = models.CharField(max_length=500, default=None)

    def __str__(self):
        return f"{self.name}"
