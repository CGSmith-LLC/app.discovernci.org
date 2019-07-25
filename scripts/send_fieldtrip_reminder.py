# -*- coding: utf-8 -*-

"""
Send a Membership Renewal Email to our Members Billing Representatives.

USAGE: $ ./manage.py runscript send_renewal_invoice

Running this script will query the database for all Active Members in our
system and email them an html/plain-text email on how to renew their membership.
"""

from datetime import datetime

from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags

from reminders.models import Reminder


def run():
    todays_reminders = Reminder.objects.filter(
        send_date=datetime.today().date(),
        fieldtrip__is_enabled=True,
        is_active=True,
        sent=False
    )
    for reminder in todays_reminders:
        # Convert plain-text body to string to concatenate variables into the body
        # text_content = """\
        #     You have an upcoming fieldtrip:
        #     """ + str(reminder.fieldtrip) + """ on """ + str(reminder.fieldtrip.start_date) + """
        #     Please contact us if you have any questions.
        # """

        # Convert html body to string to concatenate variables into the body
        # html_content = """\
        # <html>
        #   <head></head>
        #   <body>
        #     <p>You have an upcoming fieldtrip:<br>
        #        <br>
        #        """ + str(reminder.fieldtrip) + """ on """ + str(reminder.fieldtrip.start_date) + """
        #     </p>
        #     additional info: """ + str(reminder.html) + """
        #   </body>
        # </html>
        # """

        msg = EmailMultiAlternatives(
            reminder.subject,  # subject
            strip_tags(reminder.html),  # plain-text body
            'no-reply@discovernci.org',  # from-email
            [i.email for i in reminder.reminder_addresses.all()]  # to email list
        )
        msg.attach_alternative(reminder.html, "text/html")  # html-formatted bodyx
        msg.send()

        reminder.sent = True
        reminder.save()
