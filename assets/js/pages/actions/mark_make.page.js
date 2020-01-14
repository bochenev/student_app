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
    fetchedReport: []
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
      fetch(`${location.origin}/api/v1/group/${selectedGroup}?populate=users,subjects`, {
        method: 'GET'
      }).then(async res => {
        if (res.ok) {
          this.fetchedGroup = await res.json();
        }
      });
    },

    search: function () {

    }
  }
});
