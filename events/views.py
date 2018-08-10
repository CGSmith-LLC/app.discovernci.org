import json

from django.conf import settings
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

import stripe
from accounts.models import AccountProfile
from djnci.utils import send_html_email


class ChargeCustomer(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(ChargeCustomer, self).dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        response = None
        stripe.api_key = settings.STRIPE_SECRET_KEY
        data = json.loads(request.body)

        ###
        # Handle NCI Contact <-> Stripe Customer lookup/creation
        ###
        try:
            existing_customer = AccountProfile.objects.get(email=data['email'])
            # Some existing contacts do not yet have a stripe customer id
            if existing_customer.stripe_customer:
                customer = stripe.Customer.retrieve(existing_customer.stripe_customer)
            else:
                customer = stripe.Customer.create(
                    source=data['stripe_token'],
                    email=existing_customer.email,
                    metadata={
                        'phone': data['phone']
                    }
                )
                existing_customer.stripe_customer = customer.id
                existing_customer.save()
        except:
            contact = AccountProfile.objects.create(
                name=data['name'],
                email=data['email'],
                phone=data['phone']
            )
            contact.save()

            # Create a stripe customer object based on this contact
            customer = stripe.Customer.create(
                source=data['stripe_token'],
                email=contact.email,
                metadata={
                    'phone': data['phone']
                }
            )

            # Now we have a stripe customer id to attach to our contact
            contact.stripe_customer = customer.id
            contact.save()

        ###
        # Charge the customer
        ###
        charge = stripe.Charge.create(
            amount=(int(data['total']) * 100),
            currency="usd",
            customer=customer.id,
            description=data['description']
        )

        ###
        # Dispatch emails...
        ###
        email_context = {
            'data': data,
            'stripe_customer': customer.id
        }
        # Email receipt to customer
        send_html_email(
            'email_%s_receipt.html' % data['slug'],
            email_context,
            data['subject_line'],
            [data['email']],
        )
        # Email receipt to NCI staff
        send_html_email(
            'email_staff_%s_receipt.html' % data['slug'],
            email_context,
            '%s made a purchase on discovernci.org' % data['name'],
            settings.STAFF_TO_LIST,
        )

        response = JsonResponse({"status": "ok"})
        # except Exception as e:
        #    response = JsonResponse({"status": "error"}, status=403)

        return response
