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

## How to Convert database from SQLite to MySQL

1. Dump data
python manage.py dumpdata > datadump.json
2. Create a new database for the Django project.
CREATE DATABASE djnci CHARACTER SET UTF8;
3. Create a database user to use to connect to and interact with the database.
CREATE USER djnci@localhost IDENTIFIED BY 'djncidjnci';
4. Give database user access to the database
GRANT ALL PRIVILEGES ON djnci.* To djnci@localhost;
5. FLUSH the changes.
FLUSH PRIVILEGES;
6. Install the mysqlclient package that will allow us to use the database we configured:
pip install django mysqlclient
7. python manage.py migrate --run-syncdb
8. python manage.py loaddata datadump.json

## How to Edit a 'Page'

Currently, this is non-trivial to a non-developer. But here's how it's done:

1. Open 'routes.js' and add a routing path of your choosing
2. Create a React component to answer to that route. e.g.

## How to push code updates

Once you've made the changes you can push to the production web site (discovernci.org) with the following command *ONLY* if you've been given server access. Not just anyone can push updates. This is for security purposes.

1. $ cd /path/to/djnci
2. $ fab production deploy


## Obtaining a fresh copy of the database (for local development)

You can grab a snapshot of the database (again, given you have appropriate permission) by using our projects Fabric file--a python script that automates some out the repetitive tasks away.

1. $ cd /path/to/djnci
2. $ fab getdb



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
