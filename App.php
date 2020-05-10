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

//$app->setBasePath("/~tidu/hms");

// Parse json, form data and xml
$app->addBodyParsingMiddleware();

// Add the Slim built-in routing middleware
$app->addRoutingMiddleware();

$errorMiddleware = $app->addErrorMiddleware(true, false, false);

$app->get('/', function (Request $request, Response $response) {
    $html = <<<HTML
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
        body {
            text-align: center;
            background: bisque;
        }
        table {
            margin: auto;
        }
        .innerTable {
            width: 1000px;
        }
        .labelColumn {
            width: 300px;
        }
        .linkColumn {
            text-align: left;
            padding: 1rem;
        }
        hr {
            margin-bottom: 2rem;
        }
    </style>
    <title>API References</title>
</head>
<body>
    <h1>How to use this API</h1>
    <hr>
    <table border="1">
        <tr>
            <th>Methods</th>
            <th>CRUD</th>
            <th>Examples for Hospital Management Database</th>
        </tr>
        <tr>
            <td>GET</td>
            <td>Read</td>
            <td>
            <table border="1" class="innerTable">
                <tr>
                    <td class="labelColumn">Get all records</td>
                    <td class="linkColumn">HTTP GET /hms/patient</td>
                </tr>
                <tr>
                    <td class="labelColumn">Get records by params</td>
                    <td class="linkColumn">HTTP GET /hms/patient?name=john&amp;ssn=12345&amp;phone=911</td>
                </tr>
                <tr>
                    <td class="labelColumn">Get record by filter</td>
                    <td class="linkColumn">HTTP GET /hms/patient?sortAsc=name&amp;sortDesc=age&amp;sortAsc=lastVisit</td>
                </tr>
            </table>
            </td>
        </tr>
        <tr>
            <td>POST</td>
            <td>Create</td>
            <td>
                <table border="1" class="innerTable">
                    <tr>
                        <td class="labelColumn">Create record in http body</td>
                        <td class="linkColumn">HTTP POST /hms/patient</td>
                    </tr>
                </table>
            </td>          
        </tr>
        <tr>
            <td>PUT</td>
            <td>Override</td>
            <td>
                <table border="1" class="innerTable">
                    <tr>
                        <td class="labelColumn">Override record in http body</td>
                        <td class="linkColumn">HTTP PUT /hms/patient</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>PATCH</td>
            <td>Update</td>
            <td>
                <table border="1" class="innerTable">
                    <tr>
                        <td class="labelColumn">ID: record to change <br> Other params: fields to change</td>
                        <td class="linkColumn">HTTP PATCH /hms/patient?id=1&amp;name=smith</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>Delete</td>
            <td>
                <table border="1" class="innerTable">
                    <tr>
                        <td class="labelColumn">ID: record to delete</td>
                        <td class="linkColumn">HTTP PATCH /hms/patient?id=1&amp;name=smith</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
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