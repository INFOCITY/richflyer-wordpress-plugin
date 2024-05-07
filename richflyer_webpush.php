<?php
/**
 * Plugin Name:  RichFlyer
 * Description:  You will be able to receive push notifications delivered through the RichFlyer service. The plugin is very easy to install.
 * Author:       INFOCITY, Inc.
 * Author URI:   https://infocity.co.jp/
 * Text Domain:  richflyer
 * Domain Path: /languages
 * 
 * Version:      1.1.0
 */

 defined( 'ABSPATH' ) || exit;

 require_once plugin_dir_path(__FILE__).'richflyer_webpush_admin.php';
 require_once plugin_dir_path(__FILE__).'richflyer_webpush_public.php';

 add_action('init', ['RichFlyer_Webpush_Admin', 'init']);
 add_action('init', ['RichFlyer_Webpush_Admin', 'enqueue_init_button_block']);
 add_action('init', ['RichFlyer_Webpush_Admin', 'wpdocs_load_textdomain']);

 add_action('init', ['RichFlyer_Webpush_Public', 'init']);
 
 register_deactivation_hook(__FILE__, ['RichFlyer_Webpush_Admin', 'deactivate_richflyer_plugin']);

 ?>
