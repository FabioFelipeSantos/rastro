from rest_framework import permissions


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return str(obj.id) == str(request.user.id) or request.user.role == "admin"


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == "admin"

    def has_object_permission(self, request, view, obj):
        return request.user.role == "admin"
