# Generated by Django 4.2.6 on 2023-10-30 17:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0005_alter_service_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='itemstatus',
            name='service',
        ),
        migrations.DeleteModel(
            name='Service',
        ),
    ]
