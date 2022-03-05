from django.db import models

# Create your models here.


class Review(models.Model):
    # username
    # title = models.CharField(max_length=20, default=None)
    test = models.CharField(max_length=160, default=None)
    timestamp = models.DateField(auto_now_add=True, auto_now=False, blank=True)
    #rating = models.FloatField(null=True, blank=True, default=None)

    def __str__(self):
        return f" ({self.timestamp})"
# {self.title}
