from rest_framework import serializers
from .models import *

class productSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["vendor", "product_name", "discription", "stock", "price", "image", "status"]
    
class cartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["user"]
        
class cartitemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ["cart", "product", 'quantity', 'total_price']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['user', 'items', 'total_price', 'status', 'created_at']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['order', 'product', 'quantity', 'price', 'total_price']

class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['user', 'product', 'quantity', 'total_price', 'delivered_time']

class ReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Return
        fields = ['order_item', 'customer', 'status', 'created_at', 'picked_at', 'successed_at']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['product', 'customer', 'comment', 'rating', 'created_at']