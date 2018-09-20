import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

stripe.api_key = settings.STRIPE_SECRET_KEY


@csrf_exempt
def charge(request):
    data = {
        'name': 'err'
    }

    if request.method == 'POST':
        data = stripe.Charge.create(
            amount=(int(request.POST['amount']) + 100),  # Amount must be in cents for form to accept it
            currency='usd',
            description='Donation to Nature\'s Classroom Institute and Montessori',
            source=request.POST['stripeToken']
        )
        return JsonResponse(data)

    return JsonResponse(data)
