module.exports = {


  friendlyName: 'View users',


  description: 'Display "Users" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/users'
    }

  },

  fn: async function () {
    const placeId = Number(this.req.params.placeId);
    const businessPlaces = await BusinessPlace.find();
    const groups = await Group.find();
    const roles = await Role.find();

    let items = [], businessPlace = null;

    if (placeId) {
      businessPlace = businessPlaces.find(item => item.id === placeId);
      items = await User.find({where: {businessPlace: placeId}})
      .populate('role')
      .populate('address')
      .populate('businessPlace')
      .populate('group');
    } else {
      items = await User.find()
      .populate('role')
      .populate('address')
      .populate('businessPlace')
      .populate('group');
    }


    return {
      items,
      roles,
      groups,
      businessPlaces,
      businessPlace,
      isSuperAdmin: this.req.me.isSuperAdmin
    };

  }


};
