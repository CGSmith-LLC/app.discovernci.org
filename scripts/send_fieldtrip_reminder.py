# -*- coding: utf-8 -*-

"""
Send a reminder email to Teachers about their upcoming FieldTrips.

USAGE: $ ./manage.py runscript send_fieldtrip_reminder

"""

from datetime import datetime

from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags

from reminders.models import Reminder


def run():
    from_email = "Nature's Classroom <no-reply@discovernci.org>"

    # Grab all Reminders marked for today *and* earlier (just in case)
    todays_reminders = Reminder.objects.filter(
        send_date__lte=datetime.today().date(),
        fieldtrip__is_enabled=True,
        is_active=True,
        sent=False
    )

    for reminder in todays_reminders:

        # Send to all [is_active] teachers belonging to any of the schools
        # affiliated with this field trip.
        send_to_list = reminder.fieldtrip.get_teacher_email_list()

        # Reply back to this field trip locations primary contact
        reply_to_list = ["{} <{}>".format(
            reminder.fieldtrip.location.primary_contact.name,
            reminder.fieldtrip.location.primary_contact.email
        )]

        # Custom signature based on location's primary contact details
        signature = """\
            {}<br />\n
            {}<br />\n
            Nature’s Classroom Institute and Montessori School<br />\n
            Direct Phone: {}<br />\n
            Office Phone: {}<br />\n
            www.discovernci.org<br />\n
            Like us on Facebook: www.facebook.com/NaturesClassroomInstitute<br />\n
            Follow us on Instagram: www.instagram.com/NaturesClassroomInstitute<br />\n
            <img src="https://app.discovernci.org/email-signature-logo.png" alt="" />
        """.format(
            reminder.fieldtrip.location.primary_contact.name,
            reminder.fieldtrip.location.primary_contact.title,
            reminder.fieldtrip.location.primary_contact.phone,
            reminder.fieldtrip.location.phone
        )

        html_body = reminder.html + "\n" + signature
        plain_text_body = strip_tags(html_body)

        # Create and send out the Email
        msg = EmailMultiAlternatives(
            reminder.subject,
            plain_text_body,
            from_email,
            send_to_list,
            reply_to=reply_to_list
        )
        msg.attach_alternative(html_body, "text/html")  # html-formatted bodyx
        msg.send()

        # Mark sent reminders as being sent
        reminder.sent = True
        reminder.save()