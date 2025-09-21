from rest_framework.permissions import BasePermission

class IsVendor(BasePermission):
    def has_permission(self, request, view):  # type: ignore
        return (
            request.user.is_authenticated
            and hasattr(request.user, "profile")
            and request.user.profile.role == "vendor"
        )

class IsCustomer(BasePermission):
    def has_permission(self, request, view):  # type: ignore
        return (
            request.user.is_authenticated
            and hasattr(request.user, "profile")
            and request.user.profile.role == "customer"
        )

class IsAdmin(BasePermission):
    def has_permission(self, request, view):  # type: ignore
        return (
            request.user.is_authenticated 
            and request.user.is_staff 
            and request.user.is_superuser
        )