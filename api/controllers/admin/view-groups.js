module.exports = {


  friendlyName: 'View groups',


  description: 'Display "Groups" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/groups'
    }

  },


  fn: async function () {
    const placeId = Number(this.req.params.placeId);
    const businessPlaces = await BusinessPlace.find();

    let  groups = [];
    let  businessPlace = null;
    if(placeId) {
      businessPlace = businessPlaces.find(item=> item.id === placeId);
      groups = await Group.find({where: {businessPlace: placeId}}).populate('businessPlace');
    } else {
      groups = await Group.find().populate('businessPlace');
    }

    return{
      groups,
      businessPlace,
      businessPlaces,
      isSuperAdmin: this.req.me.isSuperAdmin
    };
  }
};
