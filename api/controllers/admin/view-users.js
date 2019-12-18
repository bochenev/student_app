module.exports = {


  friendlyName: 'View users',


  description: 'Display "Users" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/users'
    }

  },


  fn: async function () {

    const items = await User.find().populate('role').populate('address');
    return {
      items,
      isSuperAdmin: this.req.me.isSuperAdmin
    };

  }


};
