import ast
import json
from time import strptime

import graphene
import qrcode
import requests
import stripe
from mailchimp3 import MailChimp

from django.conf import settings
from froala_editor.fields import FroalaField
from graphene_django import DjangoObjectType
from graphene_django.converter import convert_django_field
from jsonfield import JSONField

from djnci.utils import send_html_email
from .models import Event, DitwTicketPurchase


@convert_django_field.register(JSONField)
def convert_JSONField(field, registry=None):
    return graphene.String()


@convert_django_field.register(FroalaField)
def convert_froalafield_to_string(field, registry=None):
    return graphene.String(description=field.help_text, required=not field.null)


class EventType(DjangoObjectType):
    get_absolute_url = graphene.String()

    def resolve_get_absolute_url(self, _args, *_kwargs):
        return self.get_absolute_url()

    class Meta:
        model = Event


class DitwTicketPurchaseType(DjangoObjectType):
    get_stripe_customer = graphene.String()
    get_absolute_url = graphene.String()

    def resolve_get_absolute_url(self, _args, *_kwargs):
        return self.get_absolute_url()

    class Meta:
        model = DitwTicketPurchase


# Mutations *******************************************************************

class UpdateDitwPreferences(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        rsvpToken = graphene.String()
        guestList = graphene.String()
        hostCheckedIn = graphene.Boolean()
        table = graphene.String()
        paddle = graphene.String()
        receivedManualPayment = graphene.Boolean()

    def mutate(self, info, **kwargs):
        rsvpToken = kwargs.get('rsvpToken')
        guestList = kwargs.get('guestList')
        hostCheckedIn = kwargs.get('hostCheckedIn')
        table = kwargs.get('table')
        paddle = kwargs.get('paddle')
        receivedManualPayment = kwargs.get('receivedManualPayment')

        i = DitwTicketPurchase.objects.get(rsvp_token=rsvpToken)

        if hostCheckedIn:
            i.checked_in = True
        else:
            i.checked_in = False

        if table or table == '':
            i.table = table

        if paddle or paddle == '':
            i.paddle = paddle

        if receivedManualPayment:
            i.received_manual_payment = True
        else:
            i.received_manual_payment = False

        i.guest_list = guestList

        i.save()

        # Send a notification to our Slack chat service.
        slack_data = {
            "channel": "#dinner-in-the-woods",
            "username": "DitW Bot",
            "text": "%s (%s) just updated their dinner preferences" % (i.name, i.email),
            "icon_url": "https://nciw.s3.amazonaws.com/discovernci_media/DitWIcon.jpg"
        }
        if not settings.DEBUG:
            requests.post(
                settings.SLACK_INTEGRATION_URL,
                data=json.dumps(slack_data)
            )

        return UpdateDitwPreferences(
            success=True
        )


class PurchaseDitWTickets(graphene.Mutation):
    success = graphene.Boolean()
    mailchimp_status = graphene.String()

    class Arguments:
        rsvpToken = graphene.String(required=True)
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        phone = graphene.String()
        newsletterSubscribe = graphene.Boolean()
        ticketQty = graphene.Int(required=True)
        ticketEnhancer = graphene.Int()
        wantsCabana = graphene.String(required=True)
        wantsValetParking = graphene.String(required=True)
        additionalValetCount = graphene.Int()
        deferGuestList = graphene.Boolean()
        guestList = graphene.String()
        hasVegetarianRestriction = graphene.Boolean()
        vegetarianCount = graphene.Int()
        hasVeganRestriction = graphene.Boolean()
        veganCount = graphene.Int()
        hasDairyRestriction = graphene.Boolean()
        dairyCount = graphene.Int()
        hasGlutenRestriction = graphene.Boolean()
        glutenCount = graphene.Int()
        hasFoodAllergies = graphene.String(required=True)
        foodAllergenNotes = graphene.String()
        isParentGuardian = graphene.String(required=True)
        wantsChildcare = graphene.String(required=True)
        childcareChildren = graphene.String()
        stripeToken = graphene.String()
        paymentMethod = graphene.String(required=True)
        retainPaymentInfo = graphene.String(required=True)
        totalPrice = graphene.Int()
        additionalDonation = graphene.Int()

    def mutate(self, info, **kwargs):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        rsvpToken = kwargs.get('rsvpToken')
        stripeToken = kwargs.get('stripeToken', None)

        qr = qrcode.QRCode(version=1, box_size=8, border=2)
        qr.add_data('http://dinnerinthewoods.org/%s' % rsvpToken)
        qr.make(fit=True)

        qr_img = qr.make_image()

        filepath = '%s/ditw-qrcodes/%s.png' % (settings.MEDIA_ROOT, rsvpToken)
        urlpath = '%sditw-qrcodes/%s.png' % (settings.MEDIA_URL, rsvpToken)
        qrcode_url = "https://discovernci.org%s" % urlpath
        qr_img.save(filepath)

        # Create the purchase order object
        order = DitwTicketPurchase(
            rsvp_token=rsvpToken,
            name=kwargs.get('name'),
            email=kwargs.get('email'),
            phone=kwargs.get('phone'),
            newsletter_subscribe=kwargs.get('newsletterSubscribe'),
            ticket_qty=kwargs.get('ticketQty'),
            ticket_enhancer=kwargs.get('ticketEnhancer'),
            wants_cabana=kwargs.get('wantsCabana'),
            wants_valet_parking=kwargs.get('wantsValetParking'),
            additional_valet_count=kwargs.get('additionalValetCount'),
            defer_guest_list=kwargs.get('deferGuestList'),
            guest_list=kwargs.get('guestList'),
            has_vegetarian_restriction=kwargs.get('hasVegetarianRestriction'),
            vegetarian_count=kwargs.get('vegetarianCount'),
            has_vegan_restriction=kwargs.get('hasVeganRestriction'),
            vegan_count=kwargs.get('veganCount'),
            has_dairy_restriction=kwargs.get('hasDairyRestriction'),
            dairy_count=kwargs.get('dairyCount'),
            has_gluten_restriction=kwargs.get('hasGlutenRestriction'),
            gluten_count=kwargs.get('glutenCount'),
            has_food_allergies=kwargs.get('hasFoodAllergies'),
            food_allergen_notes=kwargs.get('foodAllergenNotes'),
            is_parent_guardian=kwargs.get('isParentGuardian'),
            wants_childcare=kwargs.get('wantsChildcare'),
            childcare_children=kwargs.get('childcareChildren'),
            stripe_token=stripeToken,
            payment_method=kwargs.get('paymentMethod'),
            retain_payment_info=kwargs.get('retainPaymentInfo'),
            total_price=kwargs.get('totalPrice'),
            additional_donation=kwargs.get('additionalDonation'),
            qrcode_url=qrcode_url
        )

        # Stripe Customer details
        if stripeToken:
            try:
                existing_customer = DitwTicketPurchase.objects.get(email=order.email)
                if existing_customer.stripe_customer_id.startswith('cus_'):
                    customer = stripe.Customer.retrieve(existing_customer.stripe_customer_id)
                else:
                    customer = stripe.Customer.create(
                        source=stripeToken,
                        email=existing_customer.email,
                        metadata={
                            'phone': order.phone
                        }
                    )
            except:
                customer = stripe.Customer.create(
                    source=stripeToken,
                    email=order.email,
                    metadata={
                        'phone': order.phone
                    }
                )

            order.stripe_customer_id = customer.id
            order.save()

            # Charge the Customer
            charge = stripe.Charge.create(
                amount=(order.total_price * 100),
                currency="usd",
                customer=order.stripe_customer_id,
                description="2018 Dinner in the Woods"
            )

        # Optionally add the user to our MailChimp subscriber list
        mailchimp_status = None
        try:
            if order.newsletter_subscribe is True:
                mailchimp_status = 'subscribed'
                client = MailChimp('nciw', '12a1da954758b91006fc998424ebb72b-us9')
                client.lists.members.create('1e020f1518', {
                    'email_address': order.email,
                    'status': 'subscribed',
                    'merge_fields': {
                        'FNAME': order.get_first_name(),
                        'LNAME': order.get_last_name(),
                        # 'MMERGE10': order.phone
                    }
                })
        except:
            mailchimp_status = 'failed to subscribe'

        # Send a notification to our Slack chat service.
        slack_data = {
            "channel": "#dinner-in-the-woods",
            "username": "DitW Bot",
            "text": "*%s tickets* were just purchased by *%s* for Dinner in the Woods. \nDetails: <http://dinnerinthewoods.org/%s>\nCheck-in QR Code: <%s>" % (order.ticket_qty, order.name, order.rsvp_token, order.qrcode_url),
            "icon_url": "https://nciw.s3.amazonaws.com/discovernci_media/DitWIcon.jpg"
        }
        requests.post(
            settings.SLACK_INTEGRATION_URL,
            data=json.dumps(slack_data)
        )

        # Email the Customer a receipt
        send_html_email(
            'email_ditw2018_receipt.html',
            {'order': order.__dict__},
            'Dinner in the Woods 2018 Ticket Purchase',
            [order.email, ]
        )

        order.save()

        return PurchaseDitWTickets(
            success=True,
            mailchimp_status=mailchimp_status
        )


class Mutation(graphene.ObjectType):
    purchase_ditw_tickets = PurchaseDitWTickets.Field()
    update_ditw_preferences = UpdateDitwPreferences.Field()


class Query(object):
    events = graphene.List(
        EventType,
        limit=graphene.Int(),
        timeline=graphene.String()
    )
    event = graphene.Field(
        EventType,
        year=graphene.Int(),
        month=graphene.String(),
        slug=graphene.String()
    )
    ditw_rsvp_list = graphene.List(
        DitwTicketPurchaseType
    )
    ditw_checkin = graphene.Field(
        DitwTicketPurchaseType,
        rsvp_token=graphene.String(required=True)
    )

    def resolve_events(self, info, limit=None, timeline='upcoming'):
        qs = None
        if timeline == 'previous':
            qs = Event.objects.previous()
        elif timeline == 'upcoming':
            qs = Event.objects.upcoming()
        elif timeline == 'public':
            qs = Event.objects.public()

        if limit:
            qs = qs[:limit]
        return qs

    def resolve_event(self, info, **kwargs):
        year = kwargs.get('year')
        month = kwargs.get('month')
        slug = kwargs.get('slug')

        month_num = strptime(month, '%b').tm_mon

        if year and month and slug:
            return Event.objects.get(
                is_published=True,
                start_date__year=year,
                start_date__month=month_num,
                slug=slug
            )

        return None

    def resolve_ditw_rsvp_list(self, info, **kwargs):
        if info.context.user.is_staff:
            return DitwTicketPurchase.objects.all()
        return None

    def resolve_ditw_checkin(self, info, rsvp_token):
        if rsvp_token is None:
            return None

        try:
            i = DitwTicketPurchase.objects.get(rsvp_token=rsvp_token)
            i.childcare_children = json.dumps(ast.literal_eval(i.childcare_children))
            i.guest_list = json.dumps(ast.literal_eval(i.guest_list))
            return i
        except:
            raise Exception('Could not retrieve order details')
