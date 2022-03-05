from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from .models import Review
from .serializers import ReviewSerializer


class ReviewListView(APIView):

    def get(self, _request):
        reviews = Review.objects.all()
        serialized_reviews = ReviewSerializer(reviews, many=True)
        print('reviews', reviews)
        print('serialized_reviews', serialized_reviews)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)
# Create your views here.
