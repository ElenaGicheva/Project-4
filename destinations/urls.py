from django.urls import path
from .views import DestinationListView

urlpatterns = [
  path('', DestinationListView.as_view())
]