from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status

from .models import Destination
from .serializers import DestinationSerializer

# views 
class DestinationListView(APIView):

    def get(self, _request):
      destinations = Destination.object.all()
      serialized_festivals = DestinationSerializer(destinations, many=True)
      print('destionations', destinations)
