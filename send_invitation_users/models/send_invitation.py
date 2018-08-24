# -*- coding: utf-8 -*-
from odoo import models, api

# Send Invitation To All Users
class SendInvitation(models.TransientModel):
	_name = "send.invitation"

	@api.model
	def action_to_send_invitation(self, active_ids=False):
		# Never Connected
		if active_ids:
			users = self.env['res.users'].sudo().browse(active_ids)
		else:
			users = self.env['res.users'].sudo().search([('active','=',True), ('email','!=',False)])
		for user in users:
			if user.state == 'new':
				user.sudo().with_context({'create_user': 1}).action_reset_password()
			else:
				user.sudo().action_reset_password()
