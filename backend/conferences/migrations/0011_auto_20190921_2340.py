# Generated by Django 2.2.5 on 2019-09-21 23:40

from django.db import migrations
import i18n.fields


class Migration(migrations.Migration):

    dependencies = [
        ('conferences', '0010_merge_20190909_1807'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conference',
            name='introduction',
            field=i18n.fields.I18nTextField(verbose_name='introduction'),
        ),
        migrations.AlterField(
            model_name='conference',
            name='name',
            field=i18n.fields.I18nCharField(max_length=100, verbose_name='name'),
        ),
    ]