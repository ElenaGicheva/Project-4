from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status

from .models import Destination
from .serializers import DestinationSerializer

# views 
class DestinationListView(APIView):

    def get(self, _request):
      destinations = Destination.objects.all()
      serialized_destinations = DestinationSerializer(destinations, many=True)
      print('destionations', destinations)
      print('serialized_destinations', serialized_destinations)
      return Response(serialized_destinations.data, status=status.HTTP_200_OK)
