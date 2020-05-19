<?php

declare(strict_types=1);
require_once __DIR__ . "/vendor/autoload.php";

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response as Resp;
use Slim\Routing\RouteContext;

$app = AppFactory::create();

// $app->setBasePath("/~tidu/hms");

// Parse json, form data and xml
$app->addBodyParsingMiddleware();

// Add the Slim built-in routing middleware
$app->addRoutingMiddleware();

$errorMiddleware = $app->addErrorMiddleware(true, false, false);

$app->get('/', function (Request $request, Response $response) {
    $html = file_get_contents(__DIR__.'/reference.html');
    $response->getBody()->write($html);
    return $response;
});

$app->any('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name" . "method: " . $request->getMethod() . "   " . $_SERVER['REMOTE_ADDR']);
    $params = $request->getQueryParams();
    var_dump($params);
    return $response;
});

$app->any('/{database}/{table}', function (Request $request, Response $response, array $args): Response {
    $params = $request->getQueryParams();
    $db = $args['database'];
    $table = $args['table'];
    $method = $request->getMethod();
    return (require __DIR__ . "/src/functions/$method.php")($request, $response, $db, $table, $params);
})/*->add(function (Request $request, RequestHandler $handler) {
    if ($request->getMethod() !== 'GET' && $_SERVER['REMOTE_ADDR'] !== '172.23.112.1') {
        $message = "This ip is not allowed for this action";
        return (require __DIR__ . '/src/functions/ResponseJSON.php')(new Resp(), $message, 0, [], 403);
    }
    return $handler->handle($request);
})*/->add(function (Request $request, RequestHandler $handler) {
    $args = RouteContext::fromRequest($request)->getRoute()->getArguments();
    $db = $args['database'];
    $table = $args['table'];
    if (!is_dir(__DIR__ . "/Domain/$db/")) {
        $message = "No database named $db";
        return (require __DIR__ . '/src/functions/ResponseJSON.php')(new Resp(), $message);
    }
    if (!is_file(__DIR__ . "/Domain/$db/Models/$table.php")) {
        $message = "No table named $table in database $db";
        return (require __DIR__ . '/src/functions/ResponseJSON.php')(new Resp(), $message);
    }
    return $handler->handle($request);
});

$app->run();