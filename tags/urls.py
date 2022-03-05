from django.urls import path
from .views import TagListView

urlpatterns = [
    path('', TagListView.as_view())
]
