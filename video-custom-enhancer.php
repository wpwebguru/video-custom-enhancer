<?php

/**
 * Plugin Name: Enhance Video player
 * Description: Enhance Video player in your website.
 * Version: 1.0
 * Author: Sunny
 * License: GPLv3
 * Text Domain: video-custom-enhancer
 * Domain Path: /languages
 */

function vce_load_textdomain()
{
    load_plugin_textdomain('video-custom-enhancer', false, dirname(__FILE__) . "/languages");
}
add_action("plugins_loaded", 'vce_load_textdomain');

// Define
define('VCE_VER', '1.0');
define('VCE_PLUGIN_DIR', WP_PLUGIN_URL . '/' . plugin_basename(dirname(__FILE__)) . '/');

// JS
function vce_script()
{
    wp_enqueue_script('vce-plyr-js', plugin_dir_url(__FILE__) . 'js/plyr.polyfilled.js', array('jquery'), '3.6.3', true);
    wp_enqueue_script('vce-default-js', plugin_dir_url(__FILE__) . 'js/default.js', array('vce-plyr-js'), VCE_VER, true);
}
add_action('wp_enqueue_scripts', 'vce_script');

// CSS
function vce_style()
{
    wp_enqueue_style('vce-plyr-css', plugin_dir_url(__FILE__) . 'css/plyr.css', array(), '3.6.3', 'all');
}
add_action('wp_enqueue_scripts', 'vce_style');

add_filter( 'body_class','add_body_classes' );
function add_body_classes( $classes ) {
 
 if(current_user_can('administrator'))
 {
    $classes[] = 'is-admin';
     
   
  }  
      return $classes;
}