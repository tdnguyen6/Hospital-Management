<?php

// cli-config.php
use Doctrine\ORM\Tools\Console\ConsoleRunner;

return ConsoleRunner::createHelperSet((require_once __DIR__.'/src/functions/getEntityManager.php')('hms', 'sqlsrv', '192.168.1.151', 1433, 'tidu', 'TiDu0603-mssql'));