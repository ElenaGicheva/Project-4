# imported so we can extend from ModelSerializer
from rest_framework import serializers
from ..models import Review  # we used .. as we are going up a level.

# Serializers


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review  # specifing the model the serializer needs to use
        fields = '__all__'  # specify what to return from fields
