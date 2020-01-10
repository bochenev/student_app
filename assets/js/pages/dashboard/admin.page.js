parasails.registerPage('admin', {

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    modal: '',
    foundList: [],
    cloudError: '',
    searchStr: '',
    selectedPlace: {},
    paginatedList: {list: [], skip: 0, limit: 6, hasMore: false, previous: false},
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.getMore(true);
  },
  mounted: async function () {

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    searchExisting: async function (event, addrObj, field) {
      if (event.target.value.length < 3) return;
      this.foundList = await fetch(`${location.origin}/api/v1/search-business-place?search=${event.target.value}`, {
        method: 'GET'
      }).then(async res => {
        if (res.ok) return await res.json();
        else return [];
      });
    },
    onSelectPlace: async function(place) {
        this.selectedPlace = place;
    },

    getPrevious: async function () {
    this.paginatedList.skip = Math.max(this.paginatedList.skip - 6, 0);

      const {skip, limit} = this.paginatedList;
      fetch(`${location.origin}/api/v1/businessPlace?limit=${limit}&skip=${skip}`, {
        method: 'GET'
      }).then(async res => {
        if (res.ok) {
          this.paginatedList.list = await res.json();
          this.paginatedList.hasMore = !(this.paginatedList.list.length < limit - 1);
          this.paginatedList.previous = skip !== 0;
        }
      });
    },
    getMore: async function (isFirst) {
      if (!isFirst) {
        this.paginatedList.skip += 6;
      }
      const {skip, limit} = this.paginatedList;
      fetch(`${location.origin}/api/v1/businessPlace?limit=${limit}&skip=${skip}`, {
        method: 'GET'
      }).then(async res => {
        if (res.ok) {
          this.paginatedList.list = await res.json();
          this.paginatedList.hasMore = !(this.paginatedList.list.length < limit - 1);
          this.paginatedList.previous = skip !== 0;
        }
      });
    },

    hideOnClickOutside: function() {
        const element = $('#search-dropdown-places')[0];
        const outsideClickListener = event => {
            if (!element.contains(event.target)) { // or use: event.target.closest(selector) === null
              this.foundList = [];
              removeClickListener()
            }
        }

        const removeClickListener = () => {
            document.removeEventListener('click', outsideClickListener)
        }

        document.addEventListener('click', outsideClickListener)
    }
  }
});
