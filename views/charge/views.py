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
        cents = float(request.POST.get('amount')) * 100  # attempt to safely convert to cents
        metadata = {"Phone Number": request.POST.get('phone')}
        data = stripe.Charge.create(
            amount=int(cents),  # Amount must be in cents for form to accept it - no floats accepted
            currency='usd',
            description='Donation to Nature\'s Classroom Institute and Montessori',
            source=request.POST.get('stripeToken'),
            receipt_email=request.POST.get('email'),
            statement_descriptor='NCI DONATION',
            metadata=metadata
        )
        return JsonResponse(data)

    return JsonResponse(data)
