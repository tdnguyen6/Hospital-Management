<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


return function (Request $request, Response $response, String $database, String $table, array $params) : Response {
    require_once __DIR__."/../../Domain/$database/Models/$table.php";
    $entityManager = (require_once __DIR__."/getEntityManager.php")($database);
    $newObjs = $request->getParsedBody();
    $data = [];
    $failed = 0;
    foreach ($newObjs as $newObjFields) {
        if (!$table::validate($newObjFields)) {
            $failed += 1;
            continue;
        }
        $obj = new $table();
        $obj->setEntityManager($entityManager);
        foreach ($newObjFields as $newObjKey=>$newObjFieldValue) {
            $setter = "set$newObjKey";
            $obj->$setter($newObjFieldValue);
        }
        $entityManager->persist($obj);
        $entityManager->flush();
        $objToArray = $obj->get();
        if (!empty($objToArray)) {
            array_push( $data, $objToArray);
        } else {
            $failed += 1;
        }
    }
    $success = count($newObjs) - $failed;
    $message = "Created $success records, $failed records failed";
    return (require_once __DIR__ . '/ResponseJSON.php')($response, $message, $success, $data, 201);
};

/*return function (Request $request, Response $response, String $database, String $table, array $params) : Response {
    require_once __DIR__."/../../Domain/$database/Models/$table.php";
    $entityManager = (require_once __DIR__."/getEntityManager.php")($database);
    $newObjs = $request->getParsedBody();
    $data = [];
    $failed = 0;
    foreach ($newObjs as $newObj) {
        $createdObj = $table::create($newObj, $entityManager);
        if (!empty($createdObj)) {
            array_push( $data, $createdObj);
        } else {
            $failed += 1;
        }
    }
    $success = count($newObjs) - $failed;
    $message = "Created $success records, $failed records failed";
    return (require_once __DIR__ . '/ResponseJSON.php')($response, $message, $success, $data, 201);
};*/