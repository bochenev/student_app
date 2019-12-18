module.exports = {


  friendlyName: 'View roles',


  description: 'Display "Roles" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/roles'
    }

  },


  fn: async function () {
    const roles = await Role.find();
    return {
      roles,
      isSuperAdmin: this.req.me.isSuperAdmin
    };
  }

};
