# Generated by Django 3.2.6 on 2021-10-15 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quanly', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chuyen',
            name='DoanhThu',
            field=models.DecimalField(decimal_places=0, max_digits=12, null=True),
        ),
        migrations.AlterField(
            model_name='tuyen',
            name='GiaTien',
            field=models.DecimalField(decimal_places=0, max_digits=12, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='TienLuong',
            field=models.DecimalField(decimal_places=0, default=None, max_digits=12, null=True),
        ),
        migrations.AlterField(
            model_name='vexe',
            name='GiaTien',
            field=models.DecimalField(decimal_places=0, max_digits=12, null=True),
        ),
        migrations.AlterField(
            model_name='xevaghe',
            name='GiaTien',
            field=models.DecimalField(decimal_places=0, max_digits=12, null=True),
        ),
    ]
