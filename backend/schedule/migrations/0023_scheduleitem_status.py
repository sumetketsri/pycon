# Generated by Django 2.2.8 on 2020-03-04 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0022_auto_20200215_2340'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduleitem',
            name='status',
            field=models.CharField(choices=[('submission', 'Submission'), ('training', 'Training'), ('keynote', 'Keynote'), ('custom', 'Custom')], default='waiting_confirmation', max_length=25, verbose_name='status'),
        ),
    ]
