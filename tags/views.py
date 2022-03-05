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
# Create your views here.
