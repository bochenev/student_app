module.exports = {


  friendlyName: 'View subjects',


  description: 'Display "Subjects" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/subjects'
    }

  },


  fn: async function () {
    const placeId = Number(this.req.params.placeId);
    let items = [], businessPlace = {};

    if (placeId) {
      businessPlace = await BusinessPlace.findOne({id: placeId})
      .populate('subjects');
      if(businessPlace && businessPlace.subjects) {
        items = businessPlace.subjects;
      }
    } else {
      items = await AcademicSubject.find();
    }

    return {
      items,
      businessPlace,
      isSuperAdmin: this.req.me.isSuperAdmin
    };

  }


};
