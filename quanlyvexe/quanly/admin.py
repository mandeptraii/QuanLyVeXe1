from django.contrib import admin
from django import forms
from django.utils.html import mark_safe
from .models import *
from ckeditor_uploader.widgets import CKEditorUploadingWidget
# Register your models here.


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


class DanhGiaAdmin(admin.ModelAdmin):
    form = NoiDungForm


admin.site.register(BenXe, BenXeAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(NhanVienBanVe)
admin.site.register(TaiXe)
admin.site.register(KhachHang)
admin.site.register(Ghe)
admin.site.register(Xe)
admin.site.register(XeVaGhe)
admin.site.register(Tuyen)
admin.site.register(Chuyen)
admin.site.register(ChiTieu)
admin.site.register(DanhGia, DanhGiaAdmin)
admin.site.register(XeBaoTri)
