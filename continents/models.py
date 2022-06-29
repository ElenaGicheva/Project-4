from django.db import models


class Continent(models.Model):
    name = models.CharField(max_length=50, default=None)
    image = models.CharField(max_length=500, default=None)

    def __str__(self):
        return f"{self.name}"
