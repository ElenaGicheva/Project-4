from rest_framework import serializers
from .models import Continent


class ContinentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Continent
        fields = '__all__'
