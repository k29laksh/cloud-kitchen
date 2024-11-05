from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from . import models
class KitchenSerializers(ModelSerializer):
    class Meta:
        model = models.KitchenProfile
        fields = '__all__'