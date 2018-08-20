import json

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

from djnci.utils import send_html_email
from .models import FieldTrip

from .models import VisitSubmission


class PostRoomAssignment(View):
    context = {}

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(PostRoomAssignment, self).dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)

        fieldtrip = FieldTrip.objects.get(pk=data['pk'])
        fieldtrip.assignment = data['assignment']
        fieldtrip.save()

        return JsonResponse({'status': 'ok'})


class PostVisitSubmission(View):
    context = {}

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(PostVisitSubmission, self).dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        response = None
        # try:
        data = json.loads(request.body)

        submission = VisitSubmission.objects.create(
            preferred_time=data['preferred_time'],
            location=data['location'],
            personal_name=data['personal_name'],
            email=data['email'],
            phone=data['phone'],
            comments=data['comments']
        )
        submission.save()

        email_context = {
            'preferred_time': submission.get_preferred_time_display(),
            'location': submission.get_location_display(),
            'personal_name': submission.personal_name,
            'email': submission.email,
            'phone': submission.phone,
            'comments': submission.comments
        }

        # to_list = ['bkeating@gmail.com', ]
        if submission.location <= 4:
            to_list = ['bkeating+nciw@gmail.com', 'Jenniferbraun07@gmail.com', 'info@nciw.org']
        if submission.location > 4 < 7:
            to_list = ['bkeating+nciw@gmail.com', 'Jenniferbraun07@gmail.com', 'mirko@discovernci.org']
        if submission.location > 7 < 9:
            to_list = ['bkeating+nciw@gmail.com', 'Jenniferbraun07@gmail.com', 'geoffrey@nciw.org']
        if submission.location >= 9:
            to_list = ['bkeating+nciw@gmail.com', 'Jenniferbraun07@gmail.com', 'geoffrey@nciw.org']

        send_html_email(
            'email_staff_visit_submission.html',
            email_context,
            'New Visit Submission',
            to_list,
            from_email="Nature's Classroom <no-reply@discovernci.org>"
        )

        response = JsonResponse({"status": "ok"})
        # except Exception as e:
        #    response = JsonResponse({"status": "error"}, status=403)

        return response
