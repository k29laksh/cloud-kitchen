from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from . import models
import json

class RelatedItemSerializer(serializers.ModelSerializer):
    frequently_bought_with = serializers.SerializerMethodField()

    class Meta:
        model = models.FoodItem
        fields = '__all__'
    
    def get_frequently_bought_with(self, obj):
        return json.loads(obj.frequently_bought_with)
    
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = '__all__'