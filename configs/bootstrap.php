<?php
// bootstrap.php

require_once __DIR__ . "/settings.php";
require_once $settings['dir']['root'] . "/vendor/autoload.php";
require_once $settings['dir']['configs'] . "/dbSetup.php";
require_once $settings['dir']['configs'] . "/apiSetup.php";

return $app;
