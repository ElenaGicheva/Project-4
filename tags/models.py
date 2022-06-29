from django.db import models

# Create your models here.


class Tag(models.Model):
    tag = models.CharField(max_length=20, default=None)
    # text = models.CharField(max_length=20, default=None)

    def __str__(self):
        return f"{self.tag}"
