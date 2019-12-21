module.exports = {


  friendlyName: 'View business place',


  description: 'Display "Business place" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/business-place'
    }

  },


  fn: async function () {
    const items = await BusinessPlace.find()
      .populate('legalAddress')
      .populate('physicalAddress');

    return {
      items,
      isSuperAdmin: this.req.me.isSuperAdmin
    };

  }


};
