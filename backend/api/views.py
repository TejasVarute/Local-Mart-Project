from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .custompermissions import IsAdmin, IsCustomer, IsVendor

#Models
from .models import *
from django.contrib.auth.models import User
from loginManager.models import VendorProfile, CustomerProfile

#Serializers
from .serializers import *
from loginManager.serializers import *

# Registration Views
class CreateAdminView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [AllowAny]

class CreateVendorView(generics.CreateAPIView):
    queryset = VendorProfile.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [AllowAny]

class CreateCustomerView(generics.CreateAPIView):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]

# Login Views
class CustomerLoginView(TokenObtainPairView):
    serializer_class = lambda *args, **kwargs: RoleTokenObtainPairSerializer(*args, expected_role="customer", **kwargs) #type:ignore

class VendorLoginView(TokenObtainPairView):
    serializer_class = lambda *args, **kwargs: RoleTokenObtainPairSerializer(*args, expected_role="vendor", **kwargs) #type:ignore

class AdminLoginView(TokenObtainPairView):
    serializer_class = lambda *args, **kwargs: RoleTokenObtainPairSerializer(*args, expected_role="admin", **kwargs) #type:ignore

class GetVendorDetails(APIView):
    permission_classes = [IsAuthenticated, IsVendor]
    
    def get(self, request):
        try:
            vendor = VendorProfile.objects.get(username=request.user)
        except VendorProfile.DoesNotExist:
            return Response({"detail" : "Vendor details not Found"}, status=404)
        
        serializer = VendorSerializer(vendor)
        return Response(serializer.data)
    
#Choices Views
class StoreTypeChoicesView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({"store_type" : VendorProfile.STORE_TYPES})

class ProductStatusChoicesView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({"product_status" : Product.STATUS_CHOICES})

class OrderStatusChoicesView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({"order_status", Order.STATUS_CHOICES})

class ReturnStatusChoicesView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({"return_status", Return.STATUS_CHOICES})

# Product Views
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = productSerializer
    permission_classes = [AllowAny]

class ProductCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    serializer_class = productSerializer
    
# Cart Views
class CartView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    permission_classes = [AllowAny]
    serializer_class = cartSerializer
    
class CartItemView(generics.ListCreateAPIView):
    queryset = CartItem.objects.all()
    permission_classes = [AllowAny]
    serializer_class = cartitemSerializer

#Order Views
class OrderView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    permission_classes = [AllowAny]
    serializer_class = OrderSerializer
    
class OrderItemView(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    permission_classes = [AllowAny]
    serializer_class = OrderItemSerializer
    
class DeliveryView(generics.ListCreateAPIView):
    queryset = Delivery.objects.all()
    permission_classes = [AllowAny]
    serializer_class = DeliverySerializer
    
class ReturnView(generics.ListCreateAPIView):
    queryset = Return.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ReturnSerializer
    
class ReviewView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ReviewSerializer