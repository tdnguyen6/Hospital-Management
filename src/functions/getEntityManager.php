<?php

declare(strict_types=1);

use Doctrine\DBAL\DBALException;
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Setup;

return function (String $databaseName, String $databaseType = 'mysql', String $host = 'fdb26.awardspace.net', String $port = '3306', String $uname = '3431215_hms', String $passwd = 'hmsapi2020') : EntityManager
{
    $isDevMode = true;
    $proxyDir = null;
    $cache = null;
    $useSimpleAnnotationReader = false;
    $config = Setup::createAnnotationMetadataConfiguration([__DIR__ . "/../../Domain/" . $databaseName . "/Models"], $isDevMode, $proxyDir, $cache, $useSimpleAnnotationReader);
    $urlBy = [
        'sqlite' => "sqlite:///".__DIR__."/../../$databaseName.sqlite",
        'mysql' => "mysql://$uname:$passwd@$host:$port/3431215_$databaseName",
    ];
    try {
        $conn = DriverManager::getConnection(['url' => $urlBy[$databaseType]]);
        return EntityManager::create($conn, $config);
    } catch (DBALException $e) {
        $e->getMessage();
    } catch (ORMException $e) {
        $e->getMessage();
    }
};
