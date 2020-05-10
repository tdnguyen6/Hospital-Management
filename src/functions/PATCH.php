<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


return function (Request $request, Response $response, string $database, string $table, array $params): Response {
    require_once __DIR__ . "/../../Domain/$database/Models/$table.php";
    $entityManager = (require_once __DIR__ . "/getEntityManager.php")($database);
    $newObjs = $request->getParsedBody();
    $data = [];
    $failed = 0;
    foreach ($newObjs as $newObjFields) {
        $obj = $entityManager->find("$table", $newObjFields['id']);
        if (!$newObjFields['id'] || !$obj) {
            $failed += 1;
            continue;
        }
        unset($newObjFields['id']);
        $obj->setEntityManager($entityManager);
        foreach ($newObjFields as $newObjKey => $newObjFieldValue) {
            $setter = "set$newObjKey";
            $obj->$setter($newObjFieldValue);
        }
        $entityManager->flush();
        $objToArray = $obj->get();
        if (!empty($objToArray)) {
            array_push($data, $objToArray);
        } else {
            $failed += 1;
        }
    }
    $success = count($newObjs) - $failed;
    $message = "Patched $success records, $failed records failed";
    return (require_once __DIR__ . '/ResponseJSON.php')($response, $message, 0/*$success*/, $data, 201);
};