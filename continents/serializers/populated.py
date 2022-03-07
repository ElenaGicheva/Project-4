from .common import ContinentSerializer
from destinations.serializers.common import DestinationSerializer

class PopulatedContinentSerializer(ContinentSerializer):
    destinations=DestinationSerializer(many=True)
