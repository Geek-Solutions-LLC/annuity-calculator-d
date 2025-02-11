<?php


function load_ng_scripts() {
    wp_enqueue_style( 'ng_styles', plugin_dir_url( __FILE__ ) . 'annuity-calculator/styles.7d66deea01f51050.css' );
    wp_register_script( 'ng_main', plugin_dir_url( __FILE__ ) . 'annuity-calculator/main.0a62beefc23ce0b8.js', true );
    wp_register_script( 'ng_polyfills', plugin_dir_url( __FILE__ ) . 'annuity-calculator/polyfills.790fb78e74797f8c.js', true );
    wp_register_script( 'ng_runtime', plugin_dir_url( __FILE__ ) . 'annuity-calculator/runtime.fb284ba0080bbc06.js', true );
}

add_action( 'wp_enqueue_scripts', 'load_ng_scripts' );

function attach_ng() {
    wp_enqueue_script( 'ng_main' );
    wp_enqueue_script( 'ng_polyfills' );
    wp_enqueue_script( 'ng_runtime' );

    return "<app-root></app-root>";
}

add_shortcode( 'ng_wp', 'attach_ng' );

?>
