# Generated by Django 2.2.8 on 2020-02-15 23:40

from django.db import migrations

from helpers.unique_slugify import unique_slugify


def ensure_slugs(apps, schema_editor):
    ScheduleItem = apps.get_model('schedule', 'ScheduleItem')

    for item in ScheduleItem.objects.all():
        unique_slugify(item, item.title)
        item.save()


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0021_scheduleitem_audience_level'),
    ]

    operations = [
        migrations.RunPython(ensure_slugs, migrations.RunPython.noop)
    ]
