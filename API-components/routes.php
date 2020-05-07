<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {
    $app->get('/', function (ServerRequestInterface $request, ResponseInterface $response) {
        $response->getBody()->write("Some Tutorials For Using Hospital Management System API");

        return $response;
    });

    $app->get('/hello/{name}', function (ServerRequestInterface $request, ResponseInterface $response, array $args) {
        $name = $args['name'];
        $response->getBody()->write("Hello, $name");
    
        return $response;
    });
};

