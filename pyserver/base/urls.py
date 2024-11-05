from django.urls import path
from . import views
urlpatterns = [
    path('fre_bou/<str:item_name>/',views.get_related_items.as_view()),
    path('disease/',views.disease_view.as_view()),
    path('weather/',views.notification_view.as_view()),
    path('message/',views.message_view.as_view()),
    path('ranking/',views.get_ranking.as_view()),
]