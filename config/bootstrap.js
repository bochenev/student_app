/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // Import dependencies
  var path = require('path');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 0;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (process.env.NODE_ENV === 'production' || sails.config.models.migrate === 'safe') {
      sails.log('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "' + sails.config.environment + '" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
      return;
    }//•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
    .tolerate('doesNotExist');// (it's ok if the file doesn't exist yet-- just keep going.)

    if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
      sails.log('Skipping v' + HARD_CODED_DATA_VERSION + ' bootstrap script...  (because it\'s already been run)');
      sails.log('(last run on this computer: @ ' + (new Date(lastRunBootstrapInfo.lastRunAt)) + ')');
      return;
    }//•

    sails.log('Running v' + HARD_CODED_DATA_VERSION + ' bootstrap script...  (' + (lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v' + lastRunBootstrapInfo.lastRunVersion + ' @ ' + (new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer') + ')');
  } else {
    sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
  }

  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  }//∞

  try {
    // By convention, this is a good place to set up fake data during development.
/*
    await Role.createEach([
      {id: 1, name: 'Student'},
      {id: 2, name: 'Teacher'},
      {id: 3, name: 'Administrative'},
      {id: 4, name: 'Local Admin'},
    ]);

    await User.createEach([
      {emailAddress: 'admin@example.com', fullName: 'Ryan Dahl Administrator', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123'), role: 3, address: 3},
      {emailAddress: 'student@example.com', fullName: 'John Dow Student', isSuperAdmin: false, password: await sails.helpers.passwords.hashPassword('student'), role: 1, address: 2},
    ]);

    await Group.createEach([
      {name: '514', description: 'just a students group'},
      {name: '524', description: 'just a students group 2'},
    ]);

    await Address.createEach([
      {id: 1, country: 'Canada', city: 'Calgary, Alberta', address1: "Lincoln Park Urban, 34"},
      {id: 2, country: 'Canada', city: '  Edmonton, Alberta', address1: "Lincoln Park Urban, 34"},
      {id: 3, country: 'Canada', city: 'JustACity, Alberta', address1: "Lincoln Park Urban, 34"},
      {id: 4, country: 'Canada', city: 'JustACity, Alberta', address1: "Alberta Park Urban, 34"},
      {id: 5, country: 'Canada', city: 'JustACity, Alberta', address1: "Alberta Park Urban, 34"},
      {id: 6, country: 'Canada', city: 'JustACity, Alberta', address1: "Alberta Park Urban, 34"},
      {id: 7, country: 'Canada', city: 'JustACity, Alberta', address1: "Alberta Park Urban, 34"},
      {id: 8, country: 'Canada', city: 'JustACity, Alberta', address1: "Alberta Park Urban, 34"},
      {id: 9, country: 'Canada', city: 'JustACity, Alberta', address1: "Alberta Park Urban, 34"},
      {id: 10, country: 'Canada', city: 'JustACity, Alberta', address1: "Alberta Park Urban, 34"},
      {id: 11, country: 'Canada', city: 'JustACity, Alberta', address1: "Alberta Park Urban, 34"},
    ]);


    await Mark.createEach([
      {name: 'F', weight: 0},
      {name: 'E', weight: 1},
      {name: 'D', weight: 2},
      {name: 'C', weight: 3},
      {name: 'B', weight: 4},
      {name: 'A', weight: 5}
    ]);

    await AcademicSubject.createEach([
      {name: 'Mathematics',},
      {name: 'Business & economics'},
      {name: 'Physical sciences'},
      {name: 'Chemistry'},
    ]);


    await BusinessPlace.createEach([
      {name: ' University of Calgary', description: 'The University of Calgary (U of C or UCalgary) is a public research university located in Calgary, Alberta, Canada. The University of Calgary started in 1944 as the Calgary branch of the University of Alberta',
        legalAddress: 1},
              {name: 'University of Alberta,', description: 'The University of Alberta, ',
        legalAddress: 4},
              {name: 'University of Alberta,', description: 'The University of Alberta, ',
        legalAddress: 5},
              {name: 'University of A,', description: 'The University of Alberta, is a public research university located in Calgary, ',
        legalAddress: 6},
              {name: 'University of B,', description: 'The University of Alberta, is a public research university located in Calgary, ',
        legalAddress: 7},
              {name: 'University of C,', description: 'The University of Alberta, is a public research university located in Calgary, ',
        legalAddress: 8},
              {name: 'University of D,', description: 'The University of Alberta, is a public research university located in Calgary, ',
        legalAddress: 9},
              {name: 'University of E,', description: 'The University of Alberta, is a public research university located in Calgarior to being instituted into a separate, autonomous university in 1966. It is composed of 14 faculties and over 85 research institutes and centres.',
        legalAddress: 10},
              {name: 'University of F,', description: 'The University of Alberta, is a public research university located in ',
        legalAddress: 11},

    ]);*/

  } catch (e) {
    sails.log(e);
  }

  // Save new bootstrap version
  await sails.helpers.fs.writeJson.with({
    destination: bootstrapLastRunInfoPath,
    json: {
      lastRunVersion: HARD_CODED_DATA_VERSION,
      lastRunAt: Date.now()
    },
    force: true
  })
  .tolerate((err) => {
    sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `' + sails.config.appPath + '`.  Full error details: ' + err.stack + '\n\n(Proceeding anyway this time...)');
  });

};
