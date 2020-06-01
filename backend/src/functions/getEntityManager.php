<?php

declare(strict_types=1);

use Doctrine\DBAL\DBALException;
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Setup;

// return function (string $databaseName, string $databaseType = 'mysql', string $host = 'fdb26.awardspace.net', string $port = '3306', string $uname = '3431215_hms', string $passwd = 'hmsapi2020') : EntityManager
return function (string $databaseName, string $databaseType = 'sqlite', string $host = '172.22.144.1', string $port = '1433', string $uname = 'sa', string $passwd = 'sa') : EntityManager
{
    $isDevMode = true;
    $proxyDir = null;
    $cache = null;
    $useSimpleAnnotationReader = false;
    $config = Setup::createAnnotationMetadataConfiguration([__DIR__ . "/../../Domain/" . $databaseName . "/Models"], $isDevMode, $proxyDir, $cache, $useSimpleAnnotationReader);
    $urlBy = [
        'sqlite' => "sqlite:///".__DIR__."/../../$databaseName.sqlite",
        'mysql' => "mysql://$uname:$passwd@$host:$port/3431215_$databaseName",
        'sqlsrv' => "sqlsrv://$uname:$passwd@$host:$port/$databaseName",
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
