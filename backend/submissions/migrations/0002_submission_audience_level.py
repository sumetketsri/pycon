# Generated by Django 2.1.7 on 2019-07-04 17:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ('submissions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='submission',
            name='audience_level',
            field=models.ForeignKey(default=1,
                                    on_delete=django.db.models.deletion.PROTECT,
                                    to='conferences.AudienceLevel',
                                    verbose_name='audience level'),
            preserve_default=False,
        ),
    ]
