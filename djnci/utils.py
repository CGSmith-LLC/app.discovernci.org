import json
import requests
import stripe
from datetime import timedelta
from nameparser import HumanName

from django.conf import settings
from django.core.mail import EmailMessage
from django.template import loader


def send_html_email(template, context, subject, to_list, from_email=None, attachment=None):
    """Send an HTML-templated email to a list of users."""
    if not from_email:
        from_email = "Nature's Classroom <no-reply@discovernci.org>"

    mailt = loader.get_template(template)
    mailc = context
    msg = EmailMessage(
        subject,
        mailt.render(mailc),
        from_email,
        to_list
    )
    msg.content_subtype = "html"
    msg.send()


def week_range(date):
    """Find the first/last day of the week for the given day.

    Assuming weeks start on Sunday and end on Saturday.

    Returns a tuple of ``(start_date, end_date)``.

    example:

        this_week = week_range(timezone.now())

    """
    # isocalendar calculates the year, week of the year, and day of the week.
    # dow is Mon = 1, Sat = 6, Sun = 7
    year, week, dow = date.isocalendar()

    # Find the first day of the week.
    if dow == 7:
        # Since we want to start with Sunday, let's test for that condition.
        start_date = date
    else:
        # Otherwise, subtract `dow` number days to get the first day
        start_date = date - timedelta(dow)

    # Now, add 6 for the last day of the week (i.e., count up to Saturday)
    end_date = start_date + timedelta(6)

    return (start_date, end_date)


def msg_slack(message, channel=None):
    """Send a message to one of our Slack channels."""
    slack_data = {
        'channel': "#portal-activity",
        'username': 'NCI App',
        'icon_url': 'https://nciw.s3.amazonaws.com/discovernci_media/NCIAppSlackIcon.png',
        'text': message
    }
    if settings.DEBUG:
        print(json.dumps(slack_data))
    else:
        send_to_slack = requests.post(
            settings.SLACK_INTEGRATION_URL,
            data=json.dumps(slack_data)
        )
        if send_to_slack.status_code == 200:
            return True
        return False


def parse_first_name(str):
    """Return only the first name from a full (human) name."""
    i = HumanName(str)
    if i.first:
        return i.first.capitalize()
    return None


def parse_last_name(str):
    """Return only the last name from a full (human) name."""
    i = HumanName(str)
    if i.last:
        return i.last.capitalize()
    return None


def retrieve_stripe_customer(cus_id):
    """Return a Stripe Customer object based on Stripe customer id."""
    stripe.api_key = settings.STRIPE_SECRET_KEY
    if cus_id:
        try:
            return stripe.Customer.retrieve(cus_id)
        except:
            return None
