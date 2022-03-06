from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.core.exceptions import ValidationError

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

# Allows us to post new record into our Reviews table
    def post(self, request):
        serialized_data = ReviewSerializer(data=request.data)
        try:
            review_data.is_valid()
            serialized_data.save()
            print(serialized_data.data)
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)
        except ValidationError:
            # If validation fails, return the errors is_valid adds to serilized data
            return Response(serialized_data.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# The detail view will be for querying specific existing data
class ReviewDetailView(APIView):

    def get_review(self, pk):
        try:
          # Looks for pk in review table and returns record that matches the pk passed
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
          # No match will raise the NotFound and pass message
            raise NotFound(detail="Review not found")

    # route returns one record that matches pk

    def get(self, _request, pk):
        try:
            review = Review.objects.get(pk=pk)
            serialized_review = ReviewSerializer(review)
            return Response(serialized_review.data, status=status.HTTP_200_OK)
        except Review.DoesNotExist:
            raise NotFound(detail="Review not found")

        return Response('Success', status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        review = self.get_review(pk=pk)
        serialized_review = ReviewSerializer(review)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        review_to_update = self.get_review(pk=pk)
        serialized_review = ReviewSerializer(
            review_to_update, data=request.data)
        try:
            serialized_review.is_valid()
            serialized_review.save()
            return Response(serialized_review.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)
