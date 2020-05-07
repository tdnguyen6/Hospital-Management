<?php

// Error reporting for production
error_reporting(1);
ini_set('display_errors', '1');

// Timezone
date_default_timezone_set('Ais/Ho_Chi_Minh');

// Path settings
$dirSettings['root'] = dirname(__DIR__);
$dirSettings['temp'] = $dirSettings['root'] . '/tmp';
$dirSettings['public'] = $dirSettings['root'] . '/public';
$dirSettings['configs'] = $dirSettings['root'] . '/configs';
$dirSettings['api'] = $dirSettings['root'] . '/API-components';


// API settings
// Error Handling Middleware settings
$apiSettings['error_handler_middleware'] = [

    // Should be set to false in production
    'display_error_details' => true,

    // Parameter is passed to the default ErrorHandler
    // View in rendered output by enabling the "displayErrorDetails" setting.
    // For the console and unit tests we also disable it
    'log_errors' => true,

    // Display error details in error log
    'log_error_details' => true,
];

// Settings
$settings = [
    'dir' => $dirSettings,
    'api' => $apiSettings
];

return $settings;
