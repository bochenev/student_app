module.exports = {


  friendlyName: 'View mark make',


  description: 'Display "Mark make" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/actions/mark-make'
    }

  },


  fn: async function () {

    let businessPlace = {}, businessPlaces = [], studentReport = {};
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


    if (isStudent) {
      const marksReport = await MarksReport.find({
        where: {
          user: this.req.me.id,
          businessPlace: businessPlace.id,
        },
        sort: 'createdAt ASC'
      })
      .populate('mark')
      .populate('subject')
      .populate('author');

      marksReport
      .sort((a, b) => a.subject.name > b.subject.name)
      .forEach(reportItem => studentReport[reportItem.subject.name] = {marks: []});

      marksReport.forEach(reportItem => {
        const {mark, author, updatedAt} = reportItem;
        studentReport[reportItem.subject.name].marks.push({mark, author, updatedAt})
      });
    }

    if (this.req.me.isSuperAdmin) {
      businessPlaces = await BusinessPlace.find();
    }

    return {
      businessPlace,
      businessPlaces,
      marks,
      studentReport,
      isTeacher,
      isStudent,
      user: this.req.me,
      isLocalAdmin,
      isSuperAdmin
    };

  }


};
