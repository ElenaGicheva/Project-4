from django.urls import path

# Views
# generic view for returning all reviews and posting new reviews
from .views import ReviewListView, ReviewDetailView

urlpatterns = [
    path('', ReviewListView.as_view()),
    # Detail for specific view / single
    path('<int:pk>/', ReviewDetailView.as_view())
]
