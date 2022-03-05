from django.urls import path
from .views import ContinentListView

urlpatterns = [
  path('', ContinentListView.as_view())
]