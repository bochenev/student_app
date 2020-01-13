module.exports = {


  friendlyName: 'View business place',


  description: 'Display "Business place" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/businessPlaceAlone'
    }

  },


  fn: async function () {
    const placeId = Number(this.req.params.placeId);

    const isLocalAdmin = this.req.me.role ? (this.req.me.role.id === 4) : false;
    const isSuperAdmin = Boolean(this.req.me.isSuperAdmin);

    const businessPlace = await BusinessPlace.findOne({id: placeId})
    .populate('legalAddress')
    .populate('physicalAddress')
    .populate('subjects')
    .populate('groups');

    const subjectIds = businessPlace.subjects.map(item => item.id);
    const availableSubjects = await AcademicSubject.find({where: {id: {'!=': subjectIds}}});

    return {
      businessPlace,
      availableSubjects,
      isAllowEdit: isLocalAdmin || isSuperAdmin
    };
  }
};
