# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import uuid
from jsonfield import JSONField
from froala_editor.fields import FroalaField

from django.db import models

from djnci.utils import parse_first_name, parse_last_name, retrieve_stripe_customer
from .managers import EventManager


class DitwTicketPurchase(models.Model):
    PAYMENT_METHOD_CHOICES = (
        ('credit', 'Credit Card'),
        ('check', 'Check'),
        ('onsite', 'On-site, day of event'),
    )
    rsvp_token = models.CharField(max_length=35)
    name = models.CharField(max_length=75)
    last_name = models.CharField(max_length=75, blank=True)
    email = models.CharField(max_length=75)
    phone = models.CharField(max_length=25)
    newsletter_subscribe = models.BooleanField(default=True)
    ticket_qty = models.IntegerField()
    ticket_enhancer = models.IntegerField(default=0, null=True)
    wants_cabana = models.CharField(max_length=3)
    wants_valet_parking = models.CharField(max_length=3)
    additional_valet_count = models.IntegerField(default=0, null=True)
    defer_guest_list = models.BooleanField(default=False)
    guest_list = JSONField(blank=True, null=True)
    has_vegetarian_restriction = models.BooleanField(default=False)
    vegetarian_count = models.IntegerField(default=0, null=True)
    has_vegan_restriction = models.BooleanField(default=False)
    vegan_count = models.IntegerField(default=0, null=True)
    has_dairy_restriction = models.BooleanField(default=False)
    dairy_count = models.IntegerField(default=0, null=True)
    has_gluten_restriction = models.BooleanField(default=False)
    gluten_count = models.IntegerField(default=0, null=True)
    has_food_allergies = models.CharField(max_length=3)
    food_allergen_notes = models.TextField()
    is_parent_guardian = models.CharField(max_length=3)
    wants_childcare = models.CharField(max_length=3)
    childcare_children = JSONField(blank=True, null=True)
    stripe_token = models.CharField(max_length=75, blank=True, null=True)
    stripe_customer_id = models.CharField('Stripe Customer ID', blank=True, max_length=255)
    payment_method = models.CharField(choices=PAYMENT_METHOD_CHOICES, default="credit", max_length=10)
    received_manual_payment = models.BooleanField("Received Manul Payment", default=False, help_text="Check this box if this customer paid by check/on-site and is settled up.")
    retain_payment_info = models.CharField(max_length=3)
    total_price = models.IntegerField(null=True)
    additional_donation = models.IntegerField(null=True)
    qrcode_url = models.CharField(blank=True, max_length=75)
    table = models.CharField("Assigned Table Number", max_length=75, blank=True)
    paddle = models.CharField("Assigned Paddle ID", max_length=75, blank=True)
    checked_in = models.BooleanField(default=False)

    guid = models.CharField(max_length=140, blank=True)
    created = models.DateTimeField(editable=False, auto_now_add=True)
    modified = models.DateTimeField(blank=True, auto_now=True)

    class Meta:
        get_latest_by = 'created'
        ordering = ['-modified', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return '/events/dinner-in-the-woods/%s' % self.rsvp_token

    def get_first_name(self):
        return parse_first_name(self.name)

    def get_last_name(self):
        return parse_last_name(self.name)

    @property
    def get_stripe_customer(self):
        return retrieve_stripe_customer(self.stripe_customer_id)

    def save(self, *args, **kwargs):
        if not self.guid:
            self.guid = str(uuid.uuid4())
        super(DitwTicketPurchase, self).save(*args, **kwargs)


class Event(models.Model):

    title = models.CharField(max_length=140)
    slug = models.SlugField(max_length=140)

    body = FroalaField(
        blank=True,
        help_text="Body should include the bulk of information related to \
                   the event. Hours, Admission, Contact details.")

    teaser = FroalaField(
        blank=True,
        help_text="This copy is cited when there is not enough room to \
                   display the full body copy. It shouldn't be a direct copy \
                   & paste, but a summarized verion of the body copy.")

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    location = models.TextField(
        blank=True,
        help_text="This should comprise of a simple location name (if \
                   possible),linking to a Google Maps URL. If citing the \
                   street address itself; do so in the body field.")

    is_featured = models.BooleanField(
        "Featured Event",
        default=False,
        help_text="Check this to prioritize visability on the site.")

    is_main_feature = models.BooleanField(
        "Main Feature on Events Homepage",
        default=False,
        help_text="Checking this will make it the most prominent on \
                   easttroy.org/events/")

    is_published = models.BooleanField(
        "Publish on Site",
        default=False,
        help_text="This event will not display publicly on the site if \
                   unchecked.")

    in_calendar = models.BooleanField(
        "Display in Calendar",
        default=True,
        help_text="Uncheck this to keep the event off the site calendar.")

    custom_url = models.CharField(
        max_length=140,
        blank=True,
        help_text="If supplied, links to this event will \
                   point directly to a custom url, opening in a new \
                   tab/window.")

    display_in_menu = models.BooleanField(
        default=False,
        help_text="If checked, this event item will show up under the sites \
                   global menu's \"Event\" menu item.")
    display_menu_title = models.CharField(
        blank=True,
        max_length=75,
        help_text="You can optionally tailor the title of this event for the \
                   the purpose of displaying under the global menu's Event \
                   dropdown.")

    feature_image = models.ImageField(
        "Coverphoto",
        blank=True,
        upload_to='events', help_text="A photo to display along with the \
                                       event; if appropriate.")

    physical_flyer = models.FileField(
        blank=True,
        upload_to='events/event_flyers',
        help_text="Sometimes Events have physical flyers. Use this field to \
                    attach them. All formats allowed, but default to PDF.")

    sort_order = models.IntegerField(blank=True, null=True, default=0)

    created = models.DateTimeField(editable=False, auto_now_add=True)
    modified = models.DateTimeField(blank=True, auto_now=True)

    objects = EventManager()

    class Meta:
        get_latest_by = 'start_date'
        ordering = ['-end_date', ]

    def get_absolute_url(self):
        i = self.start_date
        year = i.strftime('%Y')
        month = i.strftime('%b')
        return '/events/%s/%s/%s' % (year, month.lower(), self.slug)

    def get_app_name(self):
        return "events"

    def get_title(self):
        return self.title

    def get_pub_date(self):
        return self.start_date

    def get_featured_image(self):
        return self.feature_image

    def get_previous_event(self):
        return self.get_previous_by_publish(is_published=True)

    def get_next_event(self):
        return self.get_next_by_publish(is_published=True)

    def get_global_menu_title(self):
        if self.display_menu_title != "":
            return self.display_menu_title
        else:
            return self.title
