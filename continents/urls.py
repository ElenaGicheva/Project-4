from django.urls import path
from .views import ContinentListView, ContinentDetailView

urlpatterns = [
    path('', ContinentListView.as_view()),
    path('<int:pk>/', ContinentDetailView.as_view()),
]
