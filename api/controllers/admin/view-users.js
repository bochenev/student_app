module.exports = {


  friendlyName: 'View users',


  description: 'Display "Users" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/users'
    }

  },


  fn: async function () {

    const items = await User.find()
      .populate('role')
      .populate('address')
      .populate('businessPlace')
      .populate('group');

    const groups = await Group.find();
    const roles = await Role.find();
    const businessPlaces = await BusinessPlace.find();

    return {
      items,
      roles,
      groups,
      businessPlaces,
      isSuperAdmin: this.req.me.isSuperAdmin
    };

  }


};
