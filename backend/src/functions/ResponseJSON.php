<?php

use Psr\Http\Message\ResponseInterface as Response;

return function (Response $response, String $message = 'Not found', int $rows = 0, array $data = [], int $status = 404) {
    $responseString = [
        'status' => $status,
        'rowsAffected' => $rows,
        'message' => $message,
        'data' => $data
    ];

    $response->getBody()->write(json_encode($responseString));
    return $response->withStatus($status)->withHeader('Content-Type', 'application/json')->withHeader('Access-Control-Allow-Origin', '*');;
};
