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
    $keys = $table::getKeys();
    foreach ($newObjs as $newObjFields) {
        $notEnoughKeys = false;
        foreach ($keys as $key) {
            if (!$newObjFields[$key]) {
                $notEnoughKeys = true;
                break;
            }
        }

        if ($notEnoughKeys) {
            $failed += 1;
            continue;
        }

        $obj = $entityManager->find("$table", array_slice($newObjFields, 0, count($keys)));

        if (!$obj) {
            $failed += 1;
            continue;
        }

        $notEnoughField1 = false;
        $notEnoughField2 = false;

        if (!$table::validate($newObjFields)) {
            $notEnoughField1 = true;
        }

        foreach ($keys as $key) {
            unset($newObjFields[$key]);
        }

        if (!$table::validate($newObjFields)) {
            $notEnoughField2 = true;
        }

        if ($notEnoughField1 && $notEnoughField2) {
            $failed += 1;
            continue;
        }

        $obj->setEntityManager($entityManager);

        foreach ($newObjFields as $newObjKey => $newObjFieldValue) {
            $setter = "set". ucfirst($newObjKey);
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
    $message = "Put $success records, $failed records failed";
    return (require_once __DIR__ . '/ResponseJSON.php')($response, $message, 0/*$success*/, $data, 201);
};