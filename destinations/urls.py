from django.urls import path
from .views import DestinationListView, DestinationDetailView

urlpatterns = [
    path('', DestinationListView.as_view()),
    path('<int:pk>/', DestinationDetailView.as_view())
]
