<?php

defined( 'ABSPATH' ) || exit;

if (!class_exists('RichFlyer_Webpush_Public')) {
    class RichFlyer_Webpush_Public {
        public function __construct() {}

        public static function init() {
            add_action('wp_enqueue_scripts', array(__CLASS__, 'import_public_style'));
            add_action('wp_enqueue_scripts', array(__CLASS__, 'import_remote_scripts'));
            add_action('admin_head', array(__CLASS__, 'import_richflyer_logo'));
            add_action('wp_footer', array(__CLASS__, 'import_public_scripts'));
        }

        //ボタンに使用するロゴの読み込み
        public static function import_richflyer_logo() {
            $richflyer_logo_path = plugins_url("img/bell.png", __FILE__);
            ?>
            <script>
                const richflyerLogoPath = '<?php echo $richflyer_logo_path ?>';
                window.richflyerLogoPath = richflyerLogoPath;
            </script>
            <?php
        }

        //サイト表示内のスタイル
        public static function import_public_style() {
            wp_enqueue_style('icon_style', plugins_url('css/style.css', __FILE__));
        }

        //サーバからのスクリプト読み込み
        public static function import_remote_scripts() {
            wp_enqueue_script("remote_script", "https://wp-content.richflyer.net/rf-functions.js");
        }

        //init処理に関するスクリプトの読み込み
        public static function import_public_scripts() {
            $sdk_key = get_option("rf_sdk_key");
            $website_domain = get_option("rf_website_domain");
            $website_push_id = get_option("rf_website_push_id");
            $auto_init = get_option("rf_auto_init");
            $serviceworker_path = plugins_url("js/rf-serviceworker.js", __FILE__);
          
            ?>
            <script>
                const sdkKey = '<?php echo $sdk_key ?>';
                const domain = '<?php echo $website_domain ?>';
                const websitePushId = '<?php echo $website_push_id ?>';
                const autoInit = '<?php echo $auto_init ?>';
                const serviceworkerPath = '<?php echo $serviceworker_path ?>';
            
                window.rfSetting = {};
                window.rfSetting.rfSdkKey = sdkKey;
                window.rfSetting.websiteDomain = domain;
                window.rfSetting.websitePushId = websitePushId;
                window.rfSetting.autoInit = autoInit;
                window.rfSetting.serviceworkerPath = serviceworkerPath;

                //auto_init処理
                const ua = window.navigator.userAgent.toLowerCase();
                const isSafari = ua.indexOf("chrome") === -1 && ua.indexOf("safari") !== -1
                const {rfSetting} = window;
                if (!isSafari && Number(rfSetting.autoInit)) {
                    rf_init(rfSetting.rfSdkKey, rfSetting.websiteDomain, rfSetting.websitePushId);
                }

                const rfInitButton = document.querySelector("#rf-init-button");
                if (rfInitButton) {
                    rfInitButton.setAttribute("onclick", "rf_init(rfSetting.rfSdkKey, rfSetting.websiteDomain, rfSetting.websitePushId)");
                }
            </script>

            <?php
        }
    }
}

?>
