from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Models
from .models import Tag
from .serializers import TagSerializer


class TagListView(APIView):

    def get(self, _request):
        tags = Tag.objects.all()
        serialized_tags = TagSerializer(tags, many=True)
        print('tags', tags)
        print('serialized_tags', serialized_tags)
        return Response(serialized_tags.data, status=status.HTTP_200_OK)

# Allows us to post new record into our Tags table
    def post(self, request):
        serialized_data = TagSerializer(data=request.data)
        try:
            serialized_data.is_valid()
            serialized_data.save()
            print(serialized_data.data)
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)
        except ValidationError:
            # If validation fails, return the errors is_valid adds to serilized data
            return Response(serialized_data.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# The detail view will be for querying specific existing data
class TagDetailView(APIView):

    def get_tag(self, pk):
        try:
          # Looks for pk in tag table and returns record that matches the pk passed
            return Tag.objects.get(pk=pk)
        except Tag.DoesNotExist:
          # No match will raise the NotFound and pass message
            raise NotFound(detail="Tag not found")

    # route returns one record that matches pk

    def get(self, _request, pk):
        try:
            tag = Tag.objects.get(pk=pk)
            serialized_tag = TagSerialTagizer(tag)
            return Response(serialized_tag.data, status=status.HTTP_200_OK)
        except Tag.DoesNotExist:
            raise NotFound(detail="Tag not found")

        return Response('Success', status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        tag = self.get_tag(pk=pk)
        serialized_tag = TagSerializer(tag)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        tag_to_update = self.get_tag(pk=pk)
        serialized_tag = TagSerializer(
            tag_to_update, data=request.data)
        try:
            serialized_tag.is_valid()
            serialized_tag.save()
            return Response(serialized_tag.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)
