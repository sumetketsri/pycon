# Generated by Django 2.2.8 on 2020-02-11 10:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0016_auto_20200211_0924'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='slot',
            options={'ordering': ['hour']},
        ),
    ]
