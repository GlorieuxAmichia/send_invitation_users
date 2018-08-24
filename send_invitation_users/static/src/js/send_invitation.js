odoo.define('send_invitation_users.invitation_to_all_users', function (require) {
"use strict";

var ListController = require('web.ListController');
var Sidebar = require('web.Sidebar');
var Dialog = require('web.Dialog');
var core = require('web.core');
var _t = core._t;

var Invitations = ListController.include({
  renderSidebar: function ($node) {
    if (this.hasSidebar && !this.sidebar) {
            var other = [{
                label: _t("Export"),
                callback: this._onExportData.bind(this)
            }];
            if (this.archiveEnabled) {
                other.push({
                    label: _t("Archive"),
                    callback: this._onToggleArchiveState.bind(this, true)
                });
                other.push({
                    label: _t("Unarchive"),
                    callback: this._onToggleArchiveState.bind(this, false)
                });
            }
            if (this.is_action_enabled('delete')) {
                other.push({
                    label: _t('Delete'),
                    callback: this._onDeleteSelectedRecords.bind(this)
                });
            }
            if (this.modelName == 'res.users') {
              other.push({
                  label: _t('Invitation or Reset Password'),
                  callback: this._invitation_to_selected_users.bind(this, false)
              });
            }
            this.sidebar = new Sidebar(this, {
                editable: this.is_action_enabled('edit'),
                env: {
                    context: this.model.get(this.handle, {raw: true}).getContext(),
                    activeIds: this.getSelectedIds(),
                    model: this.modelName,
                },
                actions: _.extend(this.toolbarActions, {other: other}),
            });
            this.sidebar.appendTo($node);

            this._toggleSidebar();
        }
  },
  renderButtons: function($node){
    this._super.apply(this, arguments);
    if (this.$buttons) {
      this.$buttons.on('click', '.invitation_to_all_users', this._invitation_to_all_users.bind(this));
      this.$buttons.appendTo($node);
    }
  },
  _invitation_to_all_users: function(event) {
    event.preventDefault();
    var self = this;
    var options = {
        confirm_callback: function () {
            self._rpc({
                model: 'send.invitation',
                method: 'action_to_send_invitation',
            }, [])
            .done(function(){
              self._after_invitation()
            });
        }
    };
    Dialog.confirm(this, _t("Do You Really Want To Send Invitation Or Reset Password To All Users ? This can take a long time."), options);
  },
  _invitation_to_selected_users: function() {
    var self = this;
    var users_number = this.getSelectedIds().length;
    var records = this.getSelectedIds();
    console.log(users_number);
    var options = {
        confirm_callback: function () {
            self._rpc({
                model: 'send.invitation',
                method: 'action_to_send_invitation',
                args: [records]
            }, [])
            .done(function(){
              self._after_invitation()
            });
        }
    };
    Dialog.confirm(this, _t("Do You Really Want To Send Invitation Or Reset Password To (" + users_number + ") Selected Users ? This can take a long time."), options);
  },
  _after_invitation: function () {
    this.do_notify(_t("Invitation or Reset Password"), _t("Successfully completed"));
  },
});
});
