module.exports = {


  friendlyName: 'View admin',


  description: 'Display "Admin" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/admin'
    }

  },


  fn: async function () {
    const isLocalAdmin = this.req.me.role ? this.req.me.role.id === 4 : false; 
    const isSuperAdmin = Boolean(this.req.me.isSuperAdmin);
    // Respond with view.
    return {
      isAllowEdit: isLocalAdmin || isSuperAdmin,
      isLocalAdmin,
      actionName: (isLocalAdmin || isSuperAdmin) ? "Manage" : "View"
    };

  }


};
