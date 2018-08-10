# -*- coding: utf-8 -*-

from django.shortcuts import render

from mailchimp3 import MailChimp


def frontpage(request):
    return render(request, 'frontpage.html')


def newsletter_signup(request):
    client = MailChimp('nciw', '12a1da954758b91006fc998424ebb72b-us9')
    client.lists.members.create('7fab981cdc', {
        'email_address': 'ben@etcc.io',
        'status': 'subscribed',
        'merge_fields': {
            'ZIPCODE': '53120',
        }
    })
    return render(request, 'index.html')
