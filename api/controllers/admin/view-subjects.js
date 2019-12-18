module.exports = {


  friendlyName: 'View subjects',


  description: 'Display "Subjects" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/subjects'
    }

  },


  fn: async function () {

    const items = await AcademicSubject.find();
    return {
      items,
      isSuperAdmin: this.req.me.isSuperAdmin
    };

  }


};
