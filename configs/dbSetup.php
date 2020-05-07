<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use Doctrine\DBAL\DriverManager;

function getEntityManager ($databaseName, $databaseType)
{
    $isDevMode = true;
    $proxyDir = null;
    $cache = null;
    $useSimpleAnnotationReader = false;
    $config = Setup::createAnnotationMetadataConfiguration([__DIR__ . "/../Domain/" . $databaseName . "/Models"], $isDevMode, $proxyDir, $cache, $useSimpleAnnotationReader);
    $urlBy = [
        'sqlite3' => 'sqlite:///' . __DIR__ . '/../' . $databaseName . '.sqlite',
        'mysql' => "mysql://tidu@localhost:3306/" . $databaseName,
    ];
    $conn = DriverManager::getConnection(['url' => $urlBy[$databaseType]]);
    return EntityManager::create($conn, $config);
};

$entityManager = getEntityManager('hms', 'sqlite3');
