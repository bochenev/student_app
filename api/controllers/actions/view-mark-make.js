module.exports = {


  friendlyName: 'View mark make',


  description: 'Display "Mark make" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/actions/mark-make'
    }

  },


  fn: async function () {

    let businessPlace = {};
    const marks = await Mark.find();
    // Respond with view.
    if (this.req.me.businessPlace) {
      businessPlace = await BusinessPlace.findOne({id: this.req.me.businessPlace.id})
        .populate('subjects')
        .populate('users');
    }

    if (businessPlace.users) {
      businessPlace.users = businessPlace.users.filter((item) => item.id !== this.req.me.id);
    }
    return {
      businessPlace,
      marks,
      subject: 'Test',
      isSuperAdmin: this.req.me.isSuperAdmin
    };

  }


};
