from django.db import models


class Review(models.Model):
    description = models.CharField(max_length=30)
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    #rating = models.FloatField(null=True, blank=True, default=None)

    review = models.ForeignKey(
        "reviews.Review",
        related_name="reviews",
        on_delete=models.CASCADE
    )

    # def __str__(self):
    # return f" {self.description} ({self.timestamp})"
# {self.title}
