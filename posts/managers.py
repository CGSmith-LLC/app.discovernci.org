from django.db.models import Manager


class PostManager(Manager):

    def all(self):
        return self.get_queryset()

    def published(self):
        return self.get_queryset().filter(
            is_published=True
        )
