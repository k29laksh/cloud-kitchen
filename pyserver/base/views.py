from . import models
from django.shortcuts import render, get_object_or_404
import json
from collections import defaultdict
from rest_framework.views import APIView
import requests
from rest_framework.response import Response
from . import serializers
from datetime import datetime
from django.http import JsonResponse
import google.generativeai as genai
import re
from .ml import EnhancedReviewAnalyzer
import math
genai.configure(api_key="AIzaSyBzmvE_42qsYA5N_QtEoM0LqXjXXnJiqbc")
model = genai.GenerativeModel('gemini-pro')
API_key="ec3c5349acccf30efb4e7c6727731563"

def bot(disease=None,city=None,message=None):
    list='''Garlic Naan, Aloo Tikki, Filter Coffee, Sev Puri, Masala Dosa, Lassi,
    Veg Fried Rice, Chilli Garlic Noodles, Ice Cream, Paneer Butter Masala,
    Pav Bhaji, Green Salad, Raita, Butter Naan, Lachha Paratha,
    Aloo Paratha, Paneer Kathi Roll, Missi Roti, Rajma Chawal, Veg Biryani,
    Steamed Rice, Jeera Rice, Spring Rolls, Chicken Hakka Noodles, Cold Coffee,
    Masala Chai, Bhel Puri, Bhindi Masala, Veg Manchurian, Paneer Tikka,
    Mirchi Ka Salan, Onion Salad, Dal Makhani, Kadhai Paneer, Palak Paneer,
    Fish Curry, Butter Chicken, Pakoras, Veg Momos, Chole Bhature, Samosa,
    Mutton Rogan Josh, Chole, Butter Pav, Gulab Jamun, Chilli Paneer,
    Roomali Roti, Pickle, Sweet Lassi, Papad, Tandoori Chicken, Idli,
    Onion Rings, Malai Kofta, Pani Puri, Curd, Chicken Biryani, Gobi Manchurian,
    Dahi Puri, Tamarind Chutney, French Fries, Mango Lassi, Green Chutney'''
    # Current Time of the day is :{datetime.now().time()} temperature is {data["main"]["temp"]}F.
    if city!=None:
        resp=requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_key}').content
        data=json.loads(resp)
        response = model.generate_content(f'This is todays weather forcast: description:{data["weather"][0]["description"]}. Recommend 3-6 name only of home made dishes in india(comma separated) to eat according to provided weather forcast.').text
        response=model.generate_content(f'Generate a small notification (simple text,no bold words and 1 liner) considering one of these food items {response} to attract customers on online to buy food.').text
    elif disease!=None:
        response = model.generate_content(f'I have {disease}.Can you recommend 3-6 name only (comma separated) to eat from all these list of items:{list}  so that i can recover fastly').text
    elif message!=None:
        response=model.generate_content(f'This are the issues {message} now recommend what should be done to improve ones cloud kitchen in breifly and concise (max 4 lines)').text
    formatted_text = re.sub(r'\*\*(.*?)\*\*', r'', response)
    formatted_text = re.sub(r'\n\*', r'', formatted_text)
    formatted_text = re.sub(r'\n', r'', formatted_text)
    return formatted_text

def handle():
    bought_together_data = [
        ['Butter Chicken', 'Butter Naan', 'Jeera Rice'],
        ['Dal Makhani', 'Paneer Butter Masala', 'Garlic Naan'],
        ['Masala Dosa', 'Idli', 'Filter Coffee'],
        ['Chicken Biryani', 'Raita', 'Papad'],
        ['Veg Biryani', 'Mirchi Ka Salan', 'Gulab Jamun'],
        ['Pani Puri', 'Dahi Puri', 'Sev Puri'],
        ['Samosa', 'Masala Chai', 'Pakoras'],
        ['Chole Bhature', 'Lassi', 'Onion Salad'],
        ['Rajma Chawal', 'Curd', 'Papad'],
        ['Pav Bhaji', 'Butter Pav', 'Onion Rings'],
        ['Paneer Tikka', 'Green Chutney', 'Roomali Roti'],
        ['Aloo Paratha', 'Curd', 'Pickle'],
        ['Veg Fried Rice', 'Gobi Manchurian', 'Spring Rolls'],
        ['Chicken Hakka Noodles', 'Veg Manchurian', 'Chilli Paneer'],
        ['Tandoori Chicken', 'Green Chutney', 'Onion Rings'],
        ['Kadhai Paneer', 'Lachha Paratha', 'Jeera Rice'],
        ['Palak Paneer', 'Butter Naan', 'Raita'],
        ['Fish Curry', 'Steamed Rice', 'Green Salad'],
        ['Mutton Rogan Josh', 'Butter Naan', 'Onion Salad'],
        ['Chilli Garlic Noodles', 'Veg Momos', 'Cold Coffee'],
        ['Sev Puri', 'Bhel Puri', 'Sweet Lassi'],
        ['Bhindi Masala', 'Missi Roti', 'Mango Lassi'],
        ['Aloo Tikki', 'Chole', 'Tamarind Chutney'],
        ['Paneer Kathi Roll', 'Cold Coffee', 'French Fries'],
        ['Malai Kofta', 'Butter Naan', 'Jeera Rice'],
        ['Gulab Jamun', 'Ice Cream', 'Masala Chai']
    ]
    mp = defaultdict(list)
    for combo in bought_together_data:
        for item in combo:
            frequency_map = defaultdict(int)
            
            for related_item in combo:
                if related_item != item:
                    frequency_map[related_item] += 1
            sorted_related_items = sorted(frequency_map.items(), key=lambda x: -x[1])
            mp[item] = [related for related, _ in sorted_related_items]
    for item_name, related_items in mp.items():
        food_item, created = models.FoodItem.objects.get_or_create(name=item_name)
        food_item.frequently_bought_with = json.dumps(related_items)
        food_item.save()

    print(models.FoodItem.objects.get(name='Butter Chicken').frequently_bought_with)

# handle()

class get_related_items(APIView):
    def get(self,request,item_name):
        food_item = get_object_or_404(models.FoodItem, name=item_name)
        serializer=serializers.RelatedItemSerializer(food_item)
        return Response(serializer.data)
# {
#     "c":4.2,
#     "data":{
#         'ID1':['avg_rating','no. of reviews','created_at'],
#         'ID2':['avg_rating','no. of reviews','created_at'],
#         'ID3':['avg_rating','no. of reviews','created_at'],
#     }
# }
beta = 0.8
m = 3
c = 4.1

data = {
    'ID1': [4.2, 30, '2023-05-15'],
    'ID2': [3.8, 12, '2024-01-10'],
    'ID3': [4.5, 50, '2022-08-20'],
}

def months_since(date_str):
    created_date = datetime.strptime(date_str, '%Y-%m-%d')
    today = datetime.today()
    delta = today - created_date
    return delta.days // 30

def calculate_rank(data, C):
    avg_rating, reviews, created_at = data
    v = reviews
    R = avg_rating
    bayesian_average = (v * R + m * C) / (v + m)
    age_in_months = months_since(created_at)
    time_based_boost = 1 / (1 + math.pow(age_in_months, beta))
    final_rank = bayesian_average * time_based_boost
    return final_rank

class get_ranking(APIView):
    def get(self, request):
        # data=requests.get('http://localhost:8000/kitchens/').content
        # data=json.loads(data)
        # c=data['c']
        # data=data['data']
        final_ranks = [(k, calculate_rank(v, c)) for k, v in data.items()]
        sorted_ranks = sorted(final_ranks, key=lambda x: x[1], reverse=True)
        sorted_ids = [kitchen_id for kitchen_id, _ in sorted_ranks]
        return Response({"resp": sorted_ids})

class disease_view(APIView):
    def get(self,request):
        formatted_text=bot("diabetes")
        return Response({"resp": formatted_text})

class weather_view(APIView):
    def get(self,request):
        formatted_text=bot(city="Jaipur")
        return Response({"resp": formatted_text})
    
sample_reviews = [
    "The pizza was amazing but the service was extremely slow. Had to wait 45 minutes!",
    "Found a hair in my soup and the manager didn't seem to care at all.",
    "Great atmosphere but the portions are way too small for the price.",
    "The sushi was fresh and the presentation was beautiful. Will definitely come back!",
    "Terrible service, rude waiter, and the food was cold when it arrived.",
    "Overall food experience was good but service was late",
    "Do packing correctly beacause the food was arrived cold due to bad packaging",
    "Bad food , smelling bad.",
    "Good food, fresh and delicious."
]

def h(l):
    r=""
    for i in l:
        r=r+i
    return r

class message_view(APIView):
    def get(self,request,pk):
        reviews=requests.get(f'http://localhost:8000/reviews/{pk}').content
        reviews=json.loads(reviews)
        reviews=reviews['resp']
        analyzer = EnhancedReviewAnalyzer()
        results = analyzer.analyze_reviews(reviews)
        message=h(results["recommendations"]["moderate"][0]["example_reviews"])
        # message=request.get('message')
        formatted_text=bot(message=message)
        return Response({"resp": formatted_text})
