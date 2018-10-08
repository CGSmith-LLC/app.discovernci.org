import stripe
from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

from djnci.utils import send_html_email

stripe.api_key = settings.STRIPE_SECRET_KEY


@csrf_exempt
def charge(request):
    data = {
        'name': 'err'
    }

    if request.method == 'POST':
        cents = float(request.POST.get('amount')) * 100  # attempt to safely convert to cents
        metadata = {"Phone Number": request.POST.get('phone')}
        try:
            data = stripe.Charge.create(
                amount=int(cents),  # Amount must be in cents for form to accept it - no floats accepted
                currency='usd',
                description='Donation to Nature\'s Classroom Institute and Montessori',
                source=request.POST.get('stripeToken'),
                statement_descriptor='NCI DONATION',
                metadata=metadata
            )

            if data.paid:
                send_html_email(
                    'email_stripe_receipt.html',
                    {
                        'receipt_id': data.stripe_id,
                        'amount': float("{0:.2f}".format(data.amount/100))
                    },
                    'Thank you for your Donation!',
                    [request.POST.get('email')]
                )

            return JsonResponse(data)
        except Exception as e:
            return HttpResponseBadRequest(e)

    return JsonResponse(data)
