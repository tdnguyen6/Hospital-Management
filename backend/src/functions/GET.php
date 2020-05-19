<?php

use Doctrine\Common\Collections\ArrayCollection;
use Psr\Http\Message\ResponseInterface as Response;
use Doctrine\Common\Collections\Criteria;
use Psr\Http\Message\ServerRequestInterface as Request;


return function (Request $request, Response $response, String $database, String $table, array $params) : Response {
    $sort = [];
    $data = [];
    $topFilter = PHP_INT_MAX;
    if (array_key_exists('sortAsc', $params)) {
        $AscFilters = explode(',', $params['sortAsc']);
        foreach ($AscFilters as $ascFilter)
            $sort[$ascFilter] = Criteria::ASC;
        unset($params['sortAsc']);
    }
    if (array_key_exists('sortDsc', $params)) {
        $DscFilters = explode(',', $params['sortDsc']);
        foreach ($DscFilters as $dscFilter)
            $sort[$dscFilter] = Criteria::DESC;
        unset($params['sortDsc']);
    }
    if (array_key_exists('num', $params)) {
        $topFilter = $params['num'];
        unset($params['num']);
    }
    $entityManager = (require __DIR__."/getEntityManager.php")($database);
    require_once __DIR__."/../../Domain/$database/Models/$table.php";

    $objects = $entityManager->getRepository("$table")->findBy($params);
    foreach ($objects as $obj) array_push($data, $obj->get());

    $criteria = Criteria::create()->orderBy($sort)->setMaxResults($topFilter);
    $data = (new ArrayCollection($data))->matching($criteria)->toArray();

    $message = "Successfully fetch all records by parameters from table $table of database $database";
    return (require __DIR__ . '/ResponseJSON.php')($response, $message, count($data), $data, 200);
};
