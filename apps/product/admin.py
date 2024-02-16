from django import forms
from django.contrib import admin
from .models import Product, ProductImage, ProductCharacteristic

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductCharacteristicInline(admin.TabularInline):
    model = ProductCharacteristic
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline, ProductCharacteristicInline]
    list_display = ('id', 'name', 'compare_price',
                    'price', 'quantity', 'sold', )
    list_display_links = ('id', 'name', )
    list_filter = ('category', 'brand')
    list_editable = ('compare_price', 'price', 'quantity')
    search_fields = ('name', 'description', 'brand')
    list_per_page = 25

admin.site.register(ProductImage)
admin.site.register(ProductCharacteristic)
admin.site.register(Product, ProductAdmin)