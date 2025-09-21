from django.db import models
from loginManager.models import VendorProfile, CustomerProfile

# Products
class Product(models.Model):
    STATUS_CHOICES = (("available", 'Available'), ('unavailable', 'Unavailable'))
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name="products", null=True)
    product_name = models.CharField(max_length=50)
    discription = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/images')
    stock = models.IntegerField(default=0)
    status = models.CharField(max_length=14, choices=STATUS_CHOICES, default='available')
    
    def __str__(self):
        return self.product_name

# Cart
class Cart(models.Model):
    user = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'Cart of {self.user.first_name} {self.user.last_name}'
    
# CartItems
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return f"{self.quantity} of {self.product.product_name} in {self.cart.user.username}'s cart"

    def total_price(self):
        return self.product.price * self.quantity
    
# Orders
class Order(models.Model):
    STATUS_CHOICES = (("pending", "Pending"),
                      ('accepted', "Accepted"),
                      ('rejected', 'Rejected'),
                      ('out for delivery', 'Out for delivery'),
                      ('delivered', 'Delivered'))
    
    user = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    items = models.CharField(max_length=1000, default=list) #type:ignore
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) #type:ignore
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
       return f"Order of {self.user.first_name} {self.user.last_name}" 
   
# OrderItems
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="order_items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__ (self):
        return f"{self.quantity} of {self.product.product_name}"
    
    @property
    def total_price(self):
        return self.price * self.quantity
    
#Deliveries
class Delivery(models.Model):
    user = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) #type:ignore
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) #type:ignore
    delivered = models.BooleanField(default=False)
    delivered_time = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"Order of {self.user.first_name} {self.user.last_name}" 
    
# ReturnRequests
class Return(models.Model):
    STATUS_CHOICES = (('pending', 'Pending'), ("accepted", 'Accepted'), ('rejected', "Rejected"))
    order_item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, null=True, blank=True)
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now=True)
    
# Reviews
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE, null=True)
    comment = models.TextField()
    rating = models.IntegerField(default=5)
    created_at = models.DateTimeField(auto_now=True)
    picked_at = models.DateTimeField(null=True, blank=True)
    successed_at = models.DateTimeField(null=True, blank=True)

# VendorOrders
# VendorPayments
# VendorDelivery
# VendorReturns

# ------------ Create as per requirements
# VendorApprovals
# Disputes
# CommisionsRates
# PlatformPayments 