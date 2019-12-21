parasails.registerPage('business-place', {

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    modelName: 'businessPlace',
    modal: '',
    formData: {},
    formErrors: {},
    cloudError: '',
    listAddress: {searchStr: '', list: []},
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
    getAddressView: function (address) {
      if (!address) return "";
      return [address.country, address.city, address.address1, address.address2].join(", ");

    },
    checkIsEditable: function (id) {
      return Boolean(this.editableItemsMap[id]);
    },
    onAddNew: function () {
      this.modal = 'edit-modal';
      this.formData = {};
      this.formErrors = {};
    },
    onEdit: function (itemData) {
      this.formData = Object.assign({}, itemData);
      this.modal = 'edit-modal';
      this.formErrors = {};
    },
    onCancel: function () {
      this.formData = {};
      this.closeExampleModal();
    },
    remove: function (id) {
      return fetch(`${location.origin}/api/v1/${this.modelName}/${id}`, {
        method: 'DELETE'
      }).then(res => {
        if (res.ok) window.location.reload();
      })
    },

    formSubmit: async function (e) {
      e.preventDefault();
      this.handleParsingForm();

      if (Object.keys(this.formErrors).length > 0) return false;
      else {
        this.cloudError = null;

        if (this.formData.legalAddress) {
          const addressRequestLegal = await fetch(`${location.origin}/api/v1/address${this.formData.legalAddress.id ? ('/' + this.formData.legalAddress.id) : ""}`, {
            method: this.formData.legalAddress.id ? 'PATCH' : 'POST',
            body: JSON.stringify(this.formData.legal),
          });

          if (addressRequestLegal.ok) {
            const addr = await addressRequestLegal.json();
            this.formData.legalAddress = addr.id;
          }
        }
        if (this.formData.physicalAddress) {
          const addressRequestPhys = await fetch(`${location.origin}/api/v1/address${this.formData.physicalAddress.id ? ('/' + this.formData.physicalAddress.id) : ""}`, {
            method: this.formData.physicalAddress.id ? 'PATCH' : 'POST',
            body: JSON.stringify(this.formData.legal),
          });

          if (addressRequestPhys.ok) {
            const addr = await addressRequestPhys.json();
            this.formData.physicalAddress = addr.id;
          }
        }

        fetch(`${location.origin}/api/v1/${this.modelName}${this.formData.id ? ('/' + this.formData.id) : ""}`, {
          method: this.formData.id ? 'PATCH' : 'POST',
          body: JSON.stringify(this.formData),
        }).then(async res => {
          if (res.ok) {
            window.location.reload();
          } else {
            const textErr = await res.text();
            this.cloudError = `${res.statusText}: ${textErr}`;
          }
        })
      }
    },

    closeExampleModal: async function () {
      this.modal = '';
    },

    handleParsingForm: function () {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      // Validate password:
      if (!this.formData.name) {
        this.formErrors.name = true;
      }
    },

    searchExisting: async function (event, addrObj, field) {
      this.listAddress.searchStr = event.target.value;
      if (event.target.value.length < 3) return;
      this.listAddress.list = await fetch(`${location.origin}/api/v1/search-address?addressString=${event.target.value}`, {
        method: 'GET'
      }).then(async res => {
        if (res.ok) return await res.json();
        else return [];
      });


      // addrObj = {...addrObj, [field]:  event.target.value}
    },


  }
});