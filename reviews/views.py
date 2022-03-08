from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status  # status lists all availabe response codes

# Exceptions
from rest_framework.exceptions import NotFound, PermissionDenied
from django.db import IntegrityError

from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Serializers
from .serializers.common import ReviewSerializer

# Models
from .models import Review

# Create your views here.


class ReviewListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # Add review
    def post(self, request):
        request.data['owner'] = request.user.id
        print(request.data)
        # print('R.User -->', request.user.id)

        serialized_review = ReviewSerializer(data=request.data)
        try:
            serialized_review.is_valid()
            serialized_review.save()
            print(serialized_review.data)
            return Response(serialized_review.data, status=status.HTTP_201_CREATED)
        except AssertionError as e:
            print(serialized_review.errors)
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            # e is a type: AsssertionError needed to convert to string as Assertion error can't convert into JSON, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # except:
        #     return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ReviewDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    def delete(self, request, pk):
        print('USER --->', request.user.id)
        try:
            review_to_delete = Review.object.get(pk=pk)
            if review_to_delete.owner != request.user:
              raise PermissionDenied(detail='Unauthorised')
            # If it does find a review, this now means it will delete it
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist:
            raise NotFound(detail="Review not found")
        except:
            return Response({
                "detail": "Failed to delete Review"
            }, status=status.HTTP_401_UNAUTHORIZED)
