# Generated by Django 3.2.6 on 2021-08-22 16:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quanly', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='xe',
            name='BenXe',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='quanly.benxe'),
        ),
    ]
