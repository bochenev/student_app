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

    const isTeacher = this.req.me.role ? (this.req.me.role.id === 2) : false;
    const isStudent = this.req.me.role ? (this.req.me.role.id === 1) : false;

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



    return {
      businessPlace,
      marks,
      isTeacher,
      isStudent,
      isSuperAdmin: this.req.me.isSuperAdmin
    };

  }


};
