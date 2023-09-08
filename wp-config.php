<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'Headless-WP' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

if ( !defined('WP_CLI') ) {
    define( 'WP_SITEURL', $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] );
    define( 'WP_HOME',    $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] );
}



/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '6xzob4Y92dVMyg9TV1yHPdO3V4PMYbObps1p89wdCfeCitMLYvOE71bdrtR1ZHvn' );
define( 'SECURE_AUTH_KEY',  '37LWlRdzGh1InEEFbYEKXbgL0HgRcWKfxS7v7XSmtW2YJozAdX0rjyvS6m5My2mE' );
define( 'LOGGED_IN_KEY',    'jWnbu0T8RT2AUdvGXZguySA54IwJXJlAM0eM4bbIld15kY8BOSYZDJI5bBusYy6c' );
define( 'NONCE_KEY',        'rVGUh0d78TT2IUWevnYUS8JyXOFKodVOaX3tMAwI9CfAW19jFfrq9Q9wsfAGH5T9' );
define( 'AUTH_SALT',        'ybw4cUEkKfv14o76snwDqpWXnvZgntyIzlFFpa2k6xj6MekyA7MN6OWhb0JHE93E' );
define( 'SECURE_AUTH_SALT', '3QwO9Idljsg4YvAsng2X3eofrtHbjFP8I2dy8YFwYjWaia2qKZ9FMwXX1ptVTJtB' );
define( 'LOGGED_IN_SALT',   'NkY8ixsZ9Wr9EnQHAsLzzSUXd2zQTrS02JtCCwz0cGqWu7RzroH0uyDPctuBtFr1' );
define( 'NONCE_SALT',       'Hkl2asYu6HSZfkQaND0xM2QLN8pPdLbbKfcI9ATMdxuJLsYPNueoeAEs5b7mBNfe' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
