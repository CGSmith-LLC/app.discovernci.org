# Nature's Classroom Institute Website & Portal Overview

NCI's website and EE portal software are one in the same. They are both part of the same codebase. The software stack that they are written with are as follows:

* Docker - To run a local development instance
* PostgreSQL - Database, this is where all data is stored
* Django - This is the 'backend' software, running on the server
* React - This is the 'frontend' software--what people see.
* GraphQL - We use this to transfer data to and from the backend <-> frontend
* LESSCSS - We use this to keep CSS styling definitions small and readable

Currently, the system runs on AWS, or 'Amazon Web Services' using the following services:

* EC2 - This is what runs our 'server'
* CloudWatch - This is what monitors our system resources / reports any warnings
* CloudFront - This is our CDN to serve files quickly
* S3 - File storage for documents, images, etc.
* Route 53 - DNS hosting

The projects technical name is 'djnci'. This is just a naming convention to help show that it's a 'django' project. If you see the name 'djnci' referenced this typically means the project folder and the process names associated with running the site.

The website 'Pages' are written in React. The nature of React is very loose structure. We did this, as appose to using something like off-the-shelf WordPress because we determined that having control over the presentation and custom functionality is important to us.

## Deploy to prod
    sudo rm -rf frontend/build/ && sudo mv frontend/live/build frontend/ && sudo rm -rf static_collected/ && sudo mv frontend/live/static_collected/ static_collected/

# NCI EE Portal
Allow Parents, Teachers and EE Staff the ability to securely manage their students/child(ren)s NCI experience.

### As a Parent
As a Parent, you can add and manage your child(ren)s profile which includes things like meal preferences and medical information.

### As a Teacher
Teachers bringing their classrooms to NCI can login to manage and review their classrooms field trip preferences. Look up student records, add notes, manage housing/bed assignments, and see what other schools might be attending at the same time.

### As an EE Staff Member
EE Staff have a birds-eye view across all field trips, their students, schools and contacts. Add notes. Keep track of medications needing to be administered. Generate reports such as kitchen dietary restrictions and manage housing/bed assignment.

## Getting Started
No matter your role; Teacher, Parent, or EE Staff, you can begin your NCI experience by going to discovernci.org and selecting 'Sign into NCI' from the Environmental Education menu item, or from any of the EE location pages themselves.

* Sign In will sign you into your NCI account. Teachers and Parents will be taken to their 'My NCI Dashboard', while EE Staff will be redirected to mobile-friendly web app.
* Create Account can get you up and running with an NCI account if you don't already have one. If you are a Teacher, your account will be need to be approved by EE Staff before you can sign in.

### My NCI Dashboard for Parents
* Add/modify my Child(ren)s profile information, including medical records, medications, dietary restrictions, meal preferences and more.
* Easily supply and review health insurance details.
* View details and Register for upcoming field trips your child(ren) will be attending.

### My NCI Dashboard for Teachers
* Add/modify classroom field trip details, including student roster, housing/bed assignment, medication logs and more.
* Lookup student profiles and parent/guardian information quickly

### EE Staff 'App'
* Get an quick glance as next field trip details
* Attach notes to students, teachers and field trips in general
* Add/modify housing/bed assignment
* Manage and log student medication administrations
* Generate reports (e.g. Kitchen dietary restrictions, Allergen lists)
* List upcoming field trips and their details


## Versions
We use [semver 2.0.0](https://semver.org/spec/v2.0.0.html)

### 1.2.0
* Bugfix: [#50](/../../issues/50) Field trip no longer editable
* Bugfix: [#49](/../../issues/49) Student form does not add tetanus
* Feature: [#48](/../../issues/48) Add CK editor
* Misc: [#37](/../../issues/37) Update weekly email

*Breaking Changes*

1. Run `pip install -r requirements.txt`
1. Run `python3.6 manage.py migrate` 
1. Run `python3.6 manage.py collectstatic --no-input`


### 1.1.0

* Feature: [#37](/../../issues/37) Weekly email to teachers
* Bugfix: [#44](/../../issues/47) Remove inactive student from fieldtrip
* Misc: [#42](/../../issues/42) Add asterisks to required fields


*Breaking Changes*

1. Add `python3.6 manage.py runscript send_fieldtrip_reminder` to @daily CRON
1. A database update is required. Run `python3.6 manage.py migrate`

### 1.0.1
* Resolves [#33](/../../issues/33)
* Resolves [#35](/../../issues/35)
* lint deconstruction syntax fix
* removed unused components and related artifact. some linting.
* get to the me prop, properly.
* Display Children before fieldtrips. Sick of scrolling.
* Removed console.log citations and unused ModalAddNew Component
* eliminating working copy noise. removed unused components, fixed lint errors, destructed props for reliable availability
* Addresses [#45](/../../issues/45)

### 1.0.0

* Feature: [#38](/../../issues/38) Add export student functionality to CSV
* Feature: [#36](/../../issues/36) Duplicate student check for parents
* Feature: [#33](/../../issues/33) Replace checkbox from parent signup with dietary caution
* Feature: [#32](/../../issues/32) Ability to deactivate students from admin panel
* Feature: [#39](/../../issues/39) Sort field trips alphabetically
* Bugfix: [#9](/../../issues/9) Fix menu overlaps
* Misc: [#34](/../../issues/34) Email changes for notifications

*Breaking Changes*

1. Add `DJNCI_SQL_PORT` and `DJNCI_SQL_DBNAME` environment variables
1. A database update is required. Run `python3.6 manage.py migrate`
