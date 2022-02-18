from django.contrib import admin
from django.contrib.auth.models import Group
from django import forms
from django.db.models import Count
from django.template.response import TemplateResponse
from django.utils.html import mark_safe
from .models import *
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path
# Register your models here.


class QuanLyVeXeAdminSite(admin.AdminSite):
    site_header = 'He thong quan ly ve xe'

    def get_urls(self):
        return [
            path('quanly-stats/', self.quanly_stats)
        ] + super().get_urls()

    def quanly_stats(self, request):
        benxe_count = BenXe.objects.count()
        stats = XeBaoTri.objects.annotate(xe_count=Count('Xe')).values("id", "xe_count")

        return TemplateResponse(request, 'admin/quanly-stats.html', {
            'benxe_count': benxe_count,
            'stats':  stats
        })


admin_site = QuanLyVeXeAdminSite('quanly')


class NoiDungForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = DanhGia
        fields = '__all__'


class BenXeAdmin(admin.ModelAdmin):
    list_display = ["id", "DiaDiem"]
    search_fields = ["DiaDiem", "id"]
    list_filter = ["DiaDiem"]


class UserAdmin(admin.ModelAdmin):
    class Media:
        css = {
            'all': ['/static/css/adminPage.css', ]
        }

    readonly_fields = ["image"]

    def image(self, user):
        return mark_safe("<img src='/static/{img_url}' alt='w' width='120px' />".format(img_url=user.avatar.name))


class ChuyenAdmin(admin.ModelAdmin):
    list_display = ["id", "Tuyen", "ThoiDiemDi"]


class DanhGiaAdmin(admin.ModelAdmin):
    form = NoiDungForm


admin.site.register(BenXe, BenXeAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Xe)
admin.site.register(Tuyen)
admin.site.register(Chuyen, ChuyenAdmin)

# admin_site.register(BenXe, BenXeAdmin)
# admin_site.register(User, UserAdmin)
# admin_site.register(NhanVienBanVe)
# admin_site.register(TaiXe)
# admin_site.register(KhachHang)
# admin_site.register(Ghe)
# admin_site.register(Xe)
# admin_site.register(XeVaGhe)
# admin_site.register(Tuyen)
# admin_site.register(Chuyen)
# admin_site.register(ChiTieu)
# admin_site.register(DanhGia, DanhGiaAdmin)
# admin_site.register(XeBaoTri)
# admin_site.register(Group)
