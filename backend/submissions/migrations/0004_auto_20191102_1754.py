# Generated by Django 2.2.6 on 2019-11-02 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0001_initial'),
        ('submissions', '0003_merge_20190730_2025'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='submission',
            name='language',
        ),
        migrations.AddField(
            model_name='submission',
            name='languages',
            field=models.ManyToManyField(to='languages.Language', verbose_name='language'),
        ),
    ]