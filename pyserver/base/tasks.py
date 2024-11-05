from celery import shared_task
from . import models
from .views import bot
@shared_task
def send_daily_notifications():
    city = "Jaipur"  # Example city for notifications
    notification_text = bot(city=city)
    
    # Save the notification to the database
    models.Notification.objects.create(content=notification_text)
    print(f"Notification sent: {notification_text}")