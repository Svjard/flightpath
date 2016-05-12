from __future__ import unicode_literals

from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.utils.translation import ugettext, ugettext_lazy as _

from authentication.models import Account

class AccountAdmin(UserAdmin):

  change_user_password_template = None

  # The fields to be used in displaying the User model.
  # These override the definitions on the base UserAdmin
  # that reference specific fields on auth.User.
  list_display = ('email', 'username', 'first_name', 'last_name',
                  'is_staff', 'is_superuser', 'date_joined')
  list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
  search_fields = ('email', 'username', 'first_name', 'last_name')

  filter_horizontal = ('groups', 'user_permissions',)

  fieldsets = (
    (None, {'fields': ('email', 'password')}),
    (_('Personal info'), {'fields': ('username', 'first_name', 'last_name', 'date_joined')}),
    (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
  )

  # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
  # overrides get_fieldsets to use this attribute when creating a user.
  add_fieldsets = (
    (None, {
      'classes': ('wide',),
      'fields': ('email', 'username', 'password1', 'password2')}
    ),
  )

  ordering = ('-last_login',)

  filter_horizontal = ('groups', 'user_permissions',)


# Now register the new UserAdmin...
admin.site.register(Account, AccountAdmin)
