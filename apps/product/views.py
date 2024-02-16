from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.core.exceptions import ObjectDoesNotExist

from apps.product.models import Product
from apps.product.serializers import ProductSerializer
from apps.category.models import Category

from django.db.models import Q

class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except ValueError:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        if Product.objects.filter(id=product_id).exists():
            product = Product.objects.get(id=product_id)

            product_serializer = ProductSerializer(product)

            return Response({'product': product_serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Product with this ID does not exist'},
                status=status.HTTP_404_NOT_FOUND)

class ListMostSoldProductsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(sekf, request, format=None):
        sortBy = '-sold'
        limit = request.query_params.get('limit')

        if not limit:
            limit = 6

        try:
            limit = int(limit)
            if limit <= 0:
                raise ValueError()
        except (TypeError, ValueError):
            return Response(
                {'error': 'Limit must be a positive integer'},
                status=status.HTTP_400_BAD_REQUEST)
        
        try:
            products_sold = Product.objects.order_by(sortBy).all()[:limit]
        except ObjectDoesNotExist:
            return Response(
                {'error': 'No products found'},
                status=status.HTTP_404_NOT_FOUND)
        
        products_sold = ProductSerializer(products_sold, many=True)

        if products_sold.data:
            return Response({'products_sold': products_sold.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products to list'},
                status=status.HTTP_404_NOT_FOUND)

class ListProductsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        sortBy = request.query_params.get('sortBy')

        if not (sortBy == 'date_created' or sortBy == 'price' or sortBy == 'sold' or sortBy == 'name'):
            sortBy = 'date_created'
        
        order = request.query_params.get('order')
        limit = request.query_params.get('limit')

        if not limit:
            limit = 6
        
        try:
            limit = int(limit)
            if limit <= 0:
                raise ValueError()
        except (TypeError, ValueError):
            return Response(
                {'error': 'Limit must be a positive integer'},
                status=status.HTTP_400_BAD_REQUEST)
        
        if order not in ['desc', 'asc', None]:
            return Response(
                {'error': 'Invalid value for order parameter. Must be "desc" or "asc"'},
                status=status.HTTP_400_BAD_REQUEST)
        
        try:
            if order == 'desc':
                products = Product.objects.order_by(sortBy).all()[:limit]
            elif order == 'asc':
                products = Product.objects.order_by(sortBy).all()[:limit]
            else:
                products = Product.objects.order_by(sortBy).all()
        except ObjectDoesNotExist:
            return Response(
                {'error': 'No products found'},
                status=status.HTTP_404_NOT_FOUND)

        products = ProductSerializer(products, many=True)

        if products.data:
            return Response({'products': products.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products to list'},
                status=status.HTTP_404_NOT_FOUND)

class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except (KeyError, ValueError):
            return Response(
                {'error': 'Invalid or missing category ID'},
                status=status.HTTP_400_BAD_REQUEST)

        search = data.get('search', '')

        if not search:
            search_results = Product.objects.order_by('-date_created').all()
        else:
            search_results = Product.objects.filter(
                Q(description__icontains=search) | Q(name__icontains=search)
            )

        if category_id == 0:
            search_results = ProductSerializer(search_results, many=True)
            return Response(
                {'search_products': search_results.data},
                status=status.HTTP_200_OK)

        try:
            category = Category.objects.get(id=category_id)
        except ObjectDoesNotExist:
            return Response(
                {'error': 'Category not found'},
                status=status.HTTP_404_NOT_FOUND)

        if category.parent:
            search_results = search_results.order_by('-date_created').filter(category=category)
        else:
            filtered_categories = [category]

            if Category.objects.filter(parent=category).exists():
                categories = Category.objects.filter(parent=category)
                filtered_categories.extend(categories)

            search_results = search_results.order_by('-date_created').filter(category__in=filtered_categories)

        search_results = ProductSerializer(search_results, many=True)
        return Response({'search_products': search_results.data}, status=status.HTTP_200_OK)

class ListRelatedView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid or missing product ID'},
                status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except ObjectDoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND)

        category = product.category

        if category.parent:
            related_products = Product.objects.order_by('-sold').filter(category=category)
        else:
            filtered_categories = [category]

            if Category.objects.filter(parent=category).exists():
                categories = Category.objects.filter(parent=category)
                filtered_categories.extend(categories)

            related_products = Product.objects.order_by('-sold').filter(category__in=filtered_categories)

        related_products = related_products.exclude(id=product_id)[:3]
        related_products = ProductSerializer(related_products, many=True)

        if related_products.data:
            return Response(
                {'related_products': related_products.data},
                status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No related products found'},
                status=status.HTTP_200_OK)

class ListBySearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data.get('category_id', 0))
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid or missing category ID'},
                status=status.HTTP_400_BAD_REQUEST)

        price_range = data.get('price_range')
        sort_by = data.get('sort_by')

        if not (sort_by == 'date_created' or sort_by == 'price' or sort_by == 'sold' or sort_by == 'name'):
            sort_by = 'date_created'

        order = data.get('order')

        if category_id == 0:
            product_results = Product.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Category not found'},
                status=status.HTTP_404_NOT_FOUND)
        else:
            category = Category.objects.get(id=category_id)
            filtered_categories = [category]

            if category.parent:
                product_results = Product.objects.filter(category=category)
            elif Category.objects.filter(parent=category).exists():
                categories = Category.objects.filter(parent=category)
                filtered_categories.extend(categories)

                product_results = Product.objects.filter(category__in=filtered_categories)
            else:
                product_results = Product.objects.filter(category=category)

        if price_range == '1 - 99.99':
            product_results = product_results.filter(price__range=(1, 99.99))
        elif price_range == '100 - 199.99':
            product_results = product_results.filter(price__range=(100, 199.99))
        elif price_range == '200 - 299.99':
            product_results = product_results.filter(price__range=(200, 299.99))
        elif price_range == '300 - 399.99':
            product_results = product_results.filter(price__range=(300, 399.99))
        elif price_range == '400 - 499.99':
            product_results = product_results.filter(price__range=(400, 499.99))
        elif price_range == 'Mas de 500':
            product_results = product_results.filter(price__gte=500)

        if order == 'desc':
            sort_by = '-' + sort_by

        product_results = product_results.order_by(sort_by)
        product_results = ProductSerializer(product_results, many=True)

        if product_results.data:
            return Response(
                {'filtered_products': product_results.data},
                status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products found'},
                status=status.HTTP_200_OK)