/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {

  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: '13fb1b3a65e1860588bc670638ba2cdf',

  // adapter: 'connect-mysql',
  // config: {
  //   user: 'root',
  //   password: 'Yw9{V"NwRU$7Mps;',
  //   //password: 'mypassword',
  //   database: 'student_app',
  // },
  // table: 'sessions',
  adapter: '@sailshq/connect-redis',
  url: 'redis://h:pcc021680b44036d308d747271e6ead7d74baa95881e80b2b34eaef5800d3cc83@ec2-3-218-187-15.compute-1.amazonaws.com:17529',

  /***************************************************************************
  *                                                                          *
  * Customize when built-in session support will be skipped.                 *
  *                                                                          *
  * (Useful for performance tuning; particularly to avoid wasting cycles on  *
  * session management when responding to simple requests for static assets, *
  * like images or stylesheets.)                                             *
  *                                                                          *
  * https://sailsjs.com/config/session                                       *
  *                                                                          *
  ***************************************************************************/
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },


};
