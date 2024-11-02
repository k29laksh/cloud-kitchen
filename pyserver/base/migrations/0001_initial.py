# Generated by Django 5.1.2 on 2024-10-30 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FoodItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('frequently_bought_with', models.ManyToManyField(related_name='related_items', to='base.fooditem')),
            ],
        ),
    ]