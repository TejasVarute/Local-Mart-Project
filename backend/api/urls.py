# App URLS
from django.urls import path, include
from .views import *

urlpatterns = [
    #Register URLS
    # path('auth/admin/register/', CreateAdminView.as_view(), name="admin_register"),
    path('auth/vendor/register/', CreateVendorView.as_view(), name="vendor_register"),
    path('auth/customer/register/', CreateCustomerView.as_view(), name="customer_register"),
    
    #Login URLS
    path("auth/admin/login/", AdminLoginView.as_view(), name="admin_login"),
    path("auth/vendor/login/", VendorLoginView.as_view(), name="vendor_login"),
    path("auth/customer/login/", CustomerLoginView.as_view(), name="customer_login"),
    
    #Get Details URLS
    path("vendor/details/", GetVendorDetails.as_view(), name="vendor_details"),
    
    
    #Choices URLS
    path("store/choices/", StoreTypeChoicesView.as_view(), name="store_type_choices"),
    path("store/products/status/", ProductStatusChoicesView.as_view(), name="product_availability"),
    path("store/products/order/status/", OrderStatusChoicesView.as_view(), name="order_status"),
    path("store/products/return/status/", ReturnStatusChoicesView.as_view(), name="return_status"),
    
    #Database URLS
    path("store/products/", ProductListView.as_view(), name="products"),
    path("store/products/add/", ProductCreateView.as_view(), name="products"),
    path("customer/cart/", CartView.as_view(), name="cartitems"),
    path("customer/cart/items/", CartItemView.as_view(), name="cartitems"),
    path("customer/order/", OrderView.as_view(), name="orders"),
    path("customer/order/items/", OrderItemView.as_view(), name="order_items"),
    path("customer/delivery/", DeliveryView.as_view(), name="delivery"),
    path("customer/return/", ReturnView.as_view(), name="return"),
    path("customer/review/", ReviewView.as_view(), name="review"),
]
