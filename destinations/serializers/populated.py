# importing existing generic serializers as we want to extend
from .common import DestinationSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from tags.serializers.common import TagSerializer

# Serializers


class PopulatedDestinationSerializer(DestinationSerializer):
    # No meta class as its inherited from Destination Serializer
    # this will populate our field with many=True as it is a list. "reviews is what we specifoed as the related_name in the foreignKey field in the Review model.
    reviews = PopulatedReviewSerializer(many=True)
    tags = TagSerializer(many=True)
