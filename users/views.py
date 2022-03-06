from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.core.exceptions import ValidationError

# Models
from .models import User
from .serializers import UserSerializer

# Create your views here.


class UserListView(APIView):

    def get(self, request):
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        print('users', users)
        print('serialized_users', serialized_users)
        return Response(serialized_users.data, status=status.HTTP_200_OK)

# Allows us to post new record into our Users table
    def post(self, request):
        serialized_data = UserSerializer(data=request.data)
        try:
            serialized_data.is_valid()
            serialized_data.save()
            print(serialized_data.data)
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)
        except ValidationError:
            # If validation fails, return the errors is_valid adds to serilized data
            return Response(serialized_data.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# The detail view will be for querying specific existing data
class UserDetailView(APIView):

    def get_user(self, pk):
        try:
          # Looks for pk in user table and returns record that matches the pk passed
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
          # No match will raise the NotFound and pass message
            raise NotFound(detail="User not found")

    # route returns User record that matches pk

    def get(self, _request, pk):
        try:
            user = User.objects.get(pk=pk)
            serialized_user = UserSerializer(user)
            return Response(serialized_user.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            user
            raise NotFound(detail="User not found")

        return Response('Success', status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        user = self.get_user(pk=pk)
        serialized_user = UserSerializer(user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        user_to_update = self.get_user(pk=pk)
        serialized_user = UserSerializer(
            user_to_update, data=request.data)
        try:
            serialized_user.is_valid()
            serialized_user.save()
            return Response(serialized_user.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)
