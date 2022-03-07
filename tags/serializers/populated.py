from .common import TagSerializer
from destinations.serializers.common import DestinationSerializer

# Serializers


class PopulatedTagSerializer(TagSerializer):
    destinations = DestinationSerializer(many=True)
