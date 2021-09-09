# Generated by Django 3.2.6 on 2021-08-22 16:29

import ckeditor_uploader.fields
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('NamSinh', models.DateField(null=True)),
                ('avatar', models.ImageField(upload_to='uploads/%Y/%m')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name_plural': 'Admin',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='BenXe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('DiaDiem', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Bến xe',
            },
        ),
        migrations.CreateModel(
            name='Ghe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('TenGhe', models.CharField(max_length=10, null=True)),
            ],
            options={
                'verbose_name_plural': 'Ghế',
            },
        ),
        migrations.CreateModel(
            name='Xe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('DaKhoiHanh', models.BooleanField(default=False)),
                ('BienSoXe', models.CharField(max_length=20)),
                ('GheDaDat', models.IntegerField()),
            ],
            options={
                'verbose_name_plural': 'Xe',
            },
        ),
        migrations.CreateModel(
            name='KhachHang',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='quanly.user')),
                ('DoThanThiet', models.IntegerField(default=0)),
                ('SoVeDaDat', models.IntegerField(default=0)),
            ],
            options={
                'verbose_name_plural': 'Khách hàng',
            },
            bases=('quanly.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='XeVaGhe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GiaTien', models.DecimalField(decimal_places=2, max_digits=8, null=True)),
                ('DaDat', models.BooleanField(default=False)),
                ('Ghe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quanly.ghe')),
                ('Xe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quanly.xe')),
            ],
            options={
                'verbose_name_plural': 'Xe và ghế',
            },
        ),
        migrations.CreateModel(
            name='XeBaoTri',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ThoiDiem', models.DateField(auto_now_add=True)),
                ('Xe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='xe', to='quanly.xe')),
            ],
            options={
                'verbose_name_plural': 'Xe bảo trì',
            },
        ),
        migrations.CreateModel(
            name='Tuyen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GiaTien', models.DecimalField(decimal_places=2, max_digits=8, null=True)),
                ('NoiDen', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tuyen_den', to='quanly.benxe')),
                ('NoiKhoiHanh', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tuyen_khoi_hanh', to='quanly.benxe')),
            ],
            options={
                'verbose_name_plural': 'Tuyến',
            },
        ),
        migrations.CreateModel(
            name='Chuyen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ThoiDiemDi', models.DateTimeField()),
                ('ThoiGianDuKien', models.IntegerField()),
                ('DaKhoiHanh', models.BooleanField()),
                ('DoanhThu', models.DecimalField(decimal_places=2, max_digits=8, null=True)),
                ('Tuyen', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='quanly.tuyen')),
                ('Xe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='quanly.xe')),
            ],
            options={
                'verbose_name_plural': 'Chuyến',
            },
        ),
        migrations.CreateModel(
            name='TaiXe',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='quanly.user')),
                ('DiemUyTin', models.FloatField()),
                ('ThuViec', models.BooleanField(default=False)),
                ('ChuyenDaLai', models.IntegerField(default=0)),
                ('TienLuong', models.DecimalField(decimal_places=2, max_digits=8, null=True)),
                ('BenXe', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='quanly.benxe')),
            ],
            options={
                'verbose_name_plural': 'Tài xế',
            },
            bases=('quanly.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='NhanVienBanVe',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='quanly.user')),
                ('TienLuong', models.DecimalField(decimal_places=2, max_digits=8, null=True)),
                ('BenXe', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='quanly.benxe')),
            ],
            options={
                'verbose_name_plural': 'Nhân viên bán vé',
            },
            bases=('quanly.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='DanhGia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ThoiGian', models.DateTimeField(auto_now_add=True, null=True)),
                ('NoiDung', ckeditor_uploader.fields.RichTextUploadingField()),
                ('SoSao', models.FloatField()),
                ('Chuyen', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quanly.chuyen')),
                ('NguoiDung', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='quanly.khachhang')),
            ],
            options={
                'verbose_name_plural': 'Đánh giá',
            },
        ),
        migrations.AddField(
            model_name='chuyen',
            name='TaiXe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='quanly.taixe'),
        ),
        migrations.CreateModel(
            name='ChiTieu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ThoiDiem', models.DateField()),
                ('NhanVienBanVe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='quanly.nhanvienbanve')),
                ('TaiXe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='quanly.taixe')),
            ],
            options={
                'verbose_name_plural': 'Chi tiêu',
            },
        ),
    ]
