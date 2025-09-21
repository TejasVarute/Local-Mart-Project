from django.contrib import admin
from loginManager.models import *
from .models import *

# Register your models here.
#LoginProfiles DBs
admin.site.register(UserProfile)
admin.site.register(CustomerProfile)
admin.site.register(VendorProfile)

#Other DBs
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Delivery)
admin.site.register(Return)
admin.site.register(Review)

