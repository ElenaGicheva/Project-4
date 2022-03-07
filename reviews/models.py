from django.db import models

# Create your models here.


class Review(models.Model):
    description = models.CharField(max_length=30, null=True, blank=False)
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    # rating = models.FloatField(null=True, blank=True, default=None)
# Building the relationship
    destination = models.ForeignKey(
        # this details the relationship with the foreign table. Syntax: name_of_app.ModelName
        "destinations.Destination",
        # this specifies the fieled the reviews will show when querying the foreign table...in this case the reviews
        related_name="reviews",
        # We are saying if a destination is deleted, the review for the destination should also be deleted.
        on_delete=models.CASCADE
    )
    # user = models.ForeignKey(
    # "users.User",
    # related_name="users",
    # on_delete=models.CASCADE
    # )


def __str__(self):
    return f"{self.description} ({self.created_at})"
