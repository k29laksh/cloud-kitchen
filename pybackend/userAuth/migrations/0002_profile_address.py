# Generated by Django 5.1.3 on 2024-11-05 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAuth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='address',
            field=models.TextField(max_length=200, null=True),
        ),
    ]
