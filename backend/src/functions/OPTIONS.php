<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


return function (Request $request, Response $response, String $database, String $table, array $params) : Response {
    return (require_once __DIR__ . '/ResponseJSON.php')($response, "Allow", 0, [], 204);
};