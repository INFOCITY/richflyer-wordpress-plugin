<?php

defined( 'ABSPATH' ) || exit;

if (!class_exists('RichFlyer_Webpush_Admin')) {
    class RichFlyer_Webpush_Admin {
        public function __construct() {}

        public static function init() {
            add_action('admin_menu', array(__CLASS__, 'richflyer_admin_menu'));
        }

        public static function wpdocs_load_textdomain() {
            load_plugin_textdomain( 'richflyer', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); 
        }

        //ブロック用のスクリプト読み込み
        public static function enqueue_init_button_block() {
            wp_register_script(
                "enqueue_init_button_block_script",
                plugins_url("js/rfInitButtonBlock.js", __FILE__),
                array("wp-blocks", "wp-element", "wp-block-editor", "wp-i18n")
            );

            wp_set_script_translations( 'enqueue_init_button_block_script', 'richflyer', plugin_dir_path(__FILE__) . 'languages/' );

            register_block_type(
                "rf-blocks/init-button-block",
                array(
                    "editor_script" => "enqueue_init_button_block_script"
                )
            );

        }

        //管理画面メニューの表示内容
        public static function richflyer_plugin_menu_page() {

            //各種値の保存
            if(array_key_exists("submit_initialize_value", $_POST)) {
                $sdkKey = sanitize_text_field($_POST["sdk-key"]);
                $domain = sanitize_url($_POST["domain"]);
                $websitePushId = sanitize_text_field($_POST["website-push-id"]);

                update_option("rf_sdk_key", $sdkKey);
                update_option("rf_website_domain", $domain);
                update_option("rf_website_push_id", $websitePushId);
                
                if(isset($_POST["init-open-window"])) {
                update_option("rf_auto_init", 1);
                } else {
                update_option("rf_auto_init", 0);
                }
        
                ?>
                <div class="update_settings_error notice is-dismissible"><strong>Success initialization!</strong></div>
                <?php
            }
        
            $sdk_key = get_option("rf_sdk_key", "");
            $website_domain = get_option("rf_website_domain", "");
            $website_push_id = get_option("rf_website_push_id", "");
            $auto_init = get_option("rf_auto_init", 0);
        
            ?>
            <div>
                <h1><?php _e('RichFlyer Settings', 'richflyer'); ?></h1>
                <form action="" method="post">
                <label for="sdk-key"><?php _e('SDK Key', 'richflyer'); ?></label>
                <textarea cols="1" name="sdk-key" class="large-text"><?php print $sdk_key; ?></textarea>
                <label for="domain"><?php _e('Website Domain', 'richflyer'); ?></label>
                <textarea cols="1" name="domain" class="large-text"><?php print $website_domain; ?></textarea>
                <label for="website-push-id"><?php _e('Website Push IDs ※Safari on macOS version 12 or lower', 'richflyer'); ?></label>
                <textarea cols="1" name="website-push-id" class="large-text"><?php print $website_push_id; ?></textarea>
                <br/>
                <br/>
                <label for="init-open-window"><?php _e('Subscribe to push notifications when web pages are loaded.', 'richflyer'); ?></label>
                <input type="checkbox" name="init-open-window" <?php echo $auto_init ? "checked" : null; ?>/>
                <br/>
                <span><?php _e('※Effective in web browsers except Safari', 'richflyer'); ?></span>
                <br/>
                <br/>
                <br/>
                <input type="submit" name="submit_initialize_value" class="button button-primary" value=<?php _e('UPDATE', 'richflyer'); ?>>
                </form>
            </div>
            <?php
        }
        
        //管理画面メニュー読み込み
        public static function richflyer_admin_menu() {
            $svg = file_get_contents(plugins_url('img/wpicon.svg', __FILE__));
            $base64EncodedSvg = base64_encode($svg);
            add_menu_page(
                __('RichFlyer', 'richflyer'),
                __('RichFlyer', 'richflyer'),
                'manage_options',
                'richflyer_menu_slug',
                array(__CLASS__, 'richflyer_plugin_menu_page'),
                "data:image/svg+xml;base64,$base64EncodedSvg"
            );
        }

        //無効化時のDB情報削除
        public static function deactivate_richflyer_plugin() {
            delete_option("rf_sdk_key");
            delete_option("rf_website_domain");
            delete_option("rf_website_push_id");
            delete_option("rf_auto_init");
        }

    }
}

?>
