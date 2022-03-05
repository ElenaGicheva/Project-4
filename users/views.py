from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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
