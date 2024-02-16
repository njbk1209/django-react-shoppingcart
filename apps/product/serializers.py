from rest_framework import serializers
from .models import Product, ProductImage, ProductCharacteristic


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image"]

class ProductCharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCharacteristic
        fields = ["id", "name", "value"]

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True
    )
    characteristics = ProductCharacteristicSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'model',
            'brand',
            'name',
            'description',
            'price',
            'compare_price',
            'category',
            'quantity',
            'sold',
            'date_created',
            'images',
            'uploaded_images',
            'characteristics',
        ]

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        characteristics_data = validated_data.pop("characteristics", [])
        product = Product.objects.create(**validated_data)

        for image in uploaded_images:
            ProductImage.objects.create(product=product, image=image)

        for characteristic_data in characteristics_data:
            ProductCharacteristic.objects.create(producto=product, **characteristic_data)

        return product