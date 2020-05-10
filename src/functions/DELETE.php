<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


return function (Request $request, Response $response, string $database, string $table, array $params): Response {
    $entityManager = (require __DIR__ . "/getEntityManager.php")($database);
    require_once __DIR__ . "/../../Domain/$database/Models/$table.php";
    $idToBeDeleted = $request->getParsedBody();
    $data = [];
    foreach ($idToBeDeleted as $id) {
        $obj = $entityManager->find($table, $id);
        if ($obj) {
            array_push($data, $obj->get());
            $entityManager->remove($obj);
            $entityManager->flush();
        }
    }
    $message = "Deleted ".count($data)." out of ".count($idToBeDeleted)." requested";
    return (require __DIR__ . '/ResponseJSON.php')($response, $message, count($data), $data, 202);
};