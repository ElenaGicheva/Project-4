from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Continent
from .serializers import ContinentSerializer

# Create your views here.
class ContinentListView(APIView):

  def get(self, _request):
      continents = Continent.objects.all()
      serialized_continents = ContinentSerializer(continents, many=True)
      print('continents', continents)
      print('serialized_continents', serialized_continents)
      return Response(serialized_continents.data, status=status.HTTP_200_OK)