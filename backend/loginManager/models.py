from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("vendor", "Vendor"),
        ("customer", "Customer"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="customer")

    def __str__(self):
        return f"{self.user.username} ({self.role})"

#CustomerProfile
class CustomerProfile(models.Model):
    first_name = models.CharField(max_length=50, default="firstname")
    last_name = models.CharField(max_length=50, default="lastname")
    email = models.EmailField(unique=True)
    phone = models.IntegerField(default=0000000000)
    address = models.TextField()
    city = models.CharField(max_length=50, default="city")
    pincode = models.IntegerField(default=000000)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=20)
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'

#VendorProfile
class VendorProfile(models.Model):
    STORE_TYPES = (
        ('grocery', 'Grocery & General Store'),
        ('clothing', 'Clothing & Fashion'),
        ('electronics', 'Electronics & Appliances'),
        ('pharmacy', 'Pharmacy & Health'),
        ('stationery', 'Stationery & Books'),
        ('furniture', 'Furniture & Home Decor'),
        ( 'jewelry', 'Jewelry & Accessories'),
        ('sports', 'Sports & Fitness'),
        ('toys', "Toys & Baby Products"),
        ('bakery', "Bakery & Confectionery"),
        ('restaurant', "Restaurant & Food Outlet"),
        ('beauty', 'Beauty & Personal Care'),
        ('automobile', "Automobile Parts & Accessories"),
        ("others", 'Others'),
    )
    
    first_name = models.CharField(max_length=50, default="firstname")
    last_name = models.CharField(max_length=50, default="lastname")
    store_name = models.CharField(max_length=100, default="storename")
    store_type = models.CharField(max_length=50, choices=STORE_TYPES, default='grocery')
    email = models.EmailField(unique=True)
    phone = models.IntegerField(default=0000000000)
    address = models.TextField()
    city = models.CharField(max_length=50, default='city')
    pincode = models.IntegerField(default=000000)
    is_verified = models.BooleanField(default=False)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=20)
    
    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'