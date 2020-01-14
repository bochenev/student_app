module.exports = {


  friendlyName: 'View mark make',


  description: 'Display "Mark make" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/actions/mark-make'
    }

  },


  fn: async function () {

    let businessPlace = {}, businessPlaces = [];
    const marks = await Mark.find();

    const isLocalAdmin = this.req.me.role ? (this.req.me.role.id === 4) : false;
    const isTeacher = this.req.me.role ? (this.req.me.role.id === 2) : false;
    const isStudent = this.req.me.role ? (this.req.me.role.id === 1) : false;
    const isSuperAdmin = Boolean(this.req.me.isSuperAdmin);

    if (this.req.me.businessPlace) {
      businessPlace = await BusinessPlace.findOne({id: this.req.me.businessPlace.id})
        .populate('subjects')
        .populate('groups')
        .populate('users');
    }

    if (businessPlace.users) {
      businessPlace.users = businessPlace.users.filter((item) => item.id !== this.req.me.id);
    }


    if(isStudent) {

    }

    if(this.req.me.isSuperAdmin) {
      businessPlaces = await BusinessPlace.find();
    }

    return {
      businessPlace,
      businessPlaces,
      marks,
      isTeacher,
      isStudent,
      user: this.req.me,
      isLocalAdmin,
      isSuperAdmin
    };

  }


};
