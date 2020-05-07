<?php

use DI\ContainerBuilder;
use Slim\App;

$containerBuilder = new ContainerBuilder();

// Set up settings
$containerBuilder->addDefinitions($settings['dir']['api'] . '/container.php');

// Build PHP-DI Container instance
$container = $containerBuilder->build();

// Create App instance
$app = $container->get(App::class);

// Register routes
(require $settings['dir']['api'] . '/routes.php')($app);

// Register middleware
(require $settings['dir']['api'] . '/middleware.php')($app);

return $app;
