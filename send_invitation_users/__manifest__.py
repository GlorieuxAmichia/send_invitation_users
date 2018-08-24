# -*- coding: utf-8 -*-
{
	'name': "Mass Invitation Or Reset Password Intruction",
	'sequence': 0,
	'summary': """Send Invitation Or Reset Password To Many Users""",
	'description': """This module is used to Send Invitation to many Users.""",
	'author': "SLife Organization, Odoo Community Association (OCA)",
	'category': 'web',
	'version': '1.0',
	'license': 'AGPL-3',
	'depends': ['auth_signup', 'web'],
	'data': ['views/send_invitation.xml'],
	'images': [
		'static/src/img/main_1.png',
		'static/src/img/main_screenshot.png'
	],
	'qweb': ['static/src/xml/template.xml'],
	'installable': True,
	'auto_install': False,
}
