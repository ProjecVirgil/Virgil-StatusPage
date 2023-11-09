# Generated by Django 4.2.6 on 2023-11-01 12:47

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0008_feature'),
    ]

    operations = [
        migrations.AddField(
            model_name='feature',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='feature',
            name='image',
            field=models.ImageField(upload_to='images/'),
        ),
    ]
