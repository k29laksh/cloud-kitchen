from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from . import models

class FoodItem(APIView):
    def get(self,request,pk=None):
        