from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db import IntegrityError

from .models import Destination
from .serializers.common import DestinationSerializer
from .serializers.populated import PopulatedDestinationSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly



class DestinationListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        destinations = Destination.objects.all()
        serialized_destinations = DestinationSerializer(
            destinations, many=True)
        print('destinations', destinations)
        print('serialized_destinations', serialized_destinations.data)
        return Response(serialized_destinations.data, status=status.HTTP_200_OK)

# Allows us to post new record into our Destinations table
    def post(self, request):
        serialized_data = DestinationSerializer(data=request.data)
        try:
            serialized_data.is_valid()
            serialized_data.save()
            print(serialized_data.data)
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            # If validation fails, return the errors is_valid adds to serilized data
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except AssertionError as e:
            return Response({"detail": serialized_data.errors}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response(
                {"detail": "Unprocessable Entity"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )


# The detail view will be for querying specific existing data
class DestinationDetailView(APIView):

    def get_destination(self, pk):
        try:
          # Looks for pk in destination table and returns record that matches the pk passed
            return Destination.objects.get(pk=pk)
        except Destination.DoesNotExist:
          # No match will raise the NotFound and pass message
            raise NotFound(detail="Destination not found")

    # route returns one record that matches pk

    def get(self, _request, pk):
        destination = self.get_destination(pk)
        serialized_destination = PopulatedDestinationSerializer(destination)
        return Response(serialized_destination.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        destination = self.get_destination(pk=pk)
        destination.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        destination_to_update = self.get_destination(pk=pk)
        serialized_destination = DestinationSerializer(
            destination_to_update, data=request.data)
        try:
            serialized_destination.is_valid()
            serialized_destination.save()
            return Response(serialized_destination.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)
