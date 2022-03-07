from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model() # returns the active user model
# Register your models here.

admin.site.register(User)