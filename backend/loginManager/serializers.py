# rest framework serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
# Databases
from django.contrib.auth.models import User
from loginManager.models import UserProfile, CustomerProfile, VendorProfile

class RoleTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, expected_role=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.expected_role = expected_role
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        if hasattr(user, "profile") and user.profile is not None:
            token["role"] = user.profile.role
        elif user.is_superuser and user.is_staff:
            token["role"] = "admin"
        else:
            token["role"] = "unknown"

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        role = "unknown"
        
        if hasattr(self.user, "profile") and self.user.profile is not None: #type:ignore
            role = self.user.profile.role                                                           #type:ignore
        elif self.user.is_superuser and self.user.is_staff:                          #type:ignore
            role = "admin"
        
        # Check if role matches expected role
        if self.expected_role and role != self.expected_role:
            raise serializers.ValidationError("This login page is only for users with role: " + self.expected_role)
        
        data["role"] = role
        data["username"] = self.user.username                                       #type:ignore
        
        return data

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "password"]
        extra_kwargs = {"password" : {"write_only" : True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data, is_staff=True, is_superuser=True)
        UserProfile.objects.create(user = user, role="admin")
        return user
    
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorProfile
        fields = ["id", "first_name", "last_name", "store_name", "store_type", "email", "phone", "address", "city", "pincode", "username", "password"]
        extra_kwargs = {"password" : {"write_only" : True}}
    
    def create(self, validated_data):
        username = validated_data.get("username")
        password = validated_data.get("password")
        email = validated_data.get("email")
        
        user = User.objects.create_user(username=username, password=password, email=email)
        UserProfile.objects.create(user = user, role="vendor")
        vendor = VendorProfile.objects.create(**validated_data)
        return vendor

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ["id", "first_name", "last_name", "email", "phone", "address", "city", "pincode", "username", "password"]
        extra_kwargs = {"password" : {"write_only" : True}}
    
    def create(self, validated_data):
        username = validated_data.get("username")
        password = validated_data.get("password")
        email = validated_data.get("email")
        
        user = User.objects.create_user(username=username, password=password, email=email)
        UserProfile.objects.create(user = user, role="customer")
        customer = CustomerProfile.objects.create(**validated_data)
        return customer