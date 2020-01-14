parasails.registerPage('mark-make', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    filter: {
      selectedGroup: 0,
      selectedUser: 0,
      selectedSubject: 0,
      selectedBusinessPlace: 0
    },
    fetchedPlace: {},
    fetchedGroup: {},
    fetchedReport: [],
    report: [],
    selectedMarks: {}
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    fetchBusinessPlace: function () {
      const {selectedBusinessPlace} = this.filter;

      this.filter = {
        ...this.filter, selectedGroup: 0,
        selectedUser: 0,
        selectedSubject: 0
      };
      this.fetchedPlace = {};
      this.fetchedGroup = {};


      fetch(`${location.origin}/api/v1/businessPlace/${selectedBusinessPlace}?populate=groups`, {
        method: 'GET'
      }).then(async res => {
        if (res.ok) {
          this.fetchedPlace = await res.json();
        }
      });
    },

    fetchGroup: function () {
      const {selectedGroup} = this.filter;
      this.filter.selectedUser = 0;
      fetch(`${location.origin}/api/v1/group/${selectedGroup}?populate=users,subjects,businessPlace`, {
        method: 'GET'
      }).then(async res => {
        if (res.ok) {
          this.fetchedGroup = await res.json();
          this.report = [];
          this.fetchedGroup.users.forEach(user => {
            this.report.push({user, marks: []})
          })

        }
      });
    },

    search: function () {

      const {
        selectedUser,
        selectedSubject,
      } = this.filter;

      if(selectedUser) {
        const reportIdx = this.report.findIndex(item => item.user.id === selectedUser);
        this.report = [this.report[reportIdx]];
      }

      fetch(`${location.origin}/api/v1/marksReport?populate=mark,author&where={"businessPlace":${this.fetchedGroup.businessPlace.id}, "subject": ${selectedSubject}${selectedUser ? ', "user": ' + selectedUser : ''}}`, {
        method: 'GET'
      }).then(async res => {
        if (res.ok) {
          const reportData = await res.json();

          this.report.forEach(item => item.marks = []);

          reportData.forEach(reportItem => {
            const reportIdx = this.report.findIndex(item => item.user.id === reportItem.user);
            if(reportItem !== -1) {
              const {mark, author} = reportItem;
              this.report[reportIdx].marks.push({mark, author})
            }
          })
        }
      });
    },

    selectMark: function (event, userId) {
      this.selectedMarks[userId] = event.target.value;
    },

    addMark: function (userId, authorId) {

      fetch(`${location.origin}/api/v1/marksReport/`, {
        method: 'POST',
        body: JSON.stringify({
          user: userId,
          subject: this.filter.selectedSubject,
          businessPlace: this.fetchedGroup.businessPlace.id,
          mark: this.selectedMarks[userId],
          author: authorId
        })
      }).then(async res => {
        if (res.ok) {
          this.search();
        }
      });

    }


  }
});
