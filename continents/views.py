from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.core.exceptions import ValidationError

from .models import Continent
from .serializers import ContinentSerializer
from .serializers import PopulatedContinentSerializer

# from .serializers import ContinentSerializer


class ContinentListView(APIView):

    def get(self, request):
        continents = Continent.objects.all()
        serialized_continents = ContinentSerializer(continents, many=True)
        print('continents', continents)
        print('serialized_continents', serialized_continents)
        return Response(serialized_continents.data, status=status.HTTP_200_OK)

# Allows us to post new record into our Continents table
    def post(self, request):
        serialized_data = ContinentSerializer(data=request.data)
        try:
            serialized_data.is_valid()
            serialized_data.save()
            print(serialized_data.data)
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)
        except ValidationError:
            # If validation fails, return the errors is_valid adds to serilized data
            return Response(serialized_data.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# The detail view will be for querying specific existing data
class ContinentDetailView(APIView):

    def get_continent(self, pk):
        try:
          # Looks for pk in continent table and returns record that matches the pk passed
            return Continent.objects.get(pk=pk)
        except Continent.DoesNotExist:
          # No match will raise the NotFound and pass message
            raise NotFound(detail="Continent not found")

    # route returns one record that matches pk

    def get(self, _request, pk):
        try:
            continent = Continent.objects.get(pk=pk)
            serialized_continent = PopulatedContinentSerializer(continent)
            return Response(serialized_continent.data, status=status.HTTP_200_OK)
        except Continent.DoesNotExist:
            raise NotFound(detail="Continent not found")
            return Response('Success', status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        continent = self.get_continent(pk=pk)
        serialized_continent = ContinentSerializer(continent)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        continent_to_update = self.get_continent(pk=pk)
        serialized_continent = ContinentSerializer(
            continent_to_update, data=request.data)
        try:
            serialized_continent.is_valid()
            serialized_continent.save()
            return Response(serialized_continent.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)
