from django.db import models
from datetime import datetime
from apps.category.models import Category

from django.conf import settings

class Product(models.Model):
    model = models.CharField(max_length=255, null=True)
    brand = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    compare_price = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name = 'images')
    image = models.ImageField(upload_to='photos/%Y/%m/', default="", null=True, blank=True)

class ProductCharacteristic(models.Model):
    producto = models.ForeignKey(Product, on_delete=models.CASCADE, related_name = 'characteristics')
    name = models.CharField(max_length=50)
    value = models.CharField(max_length=50)
