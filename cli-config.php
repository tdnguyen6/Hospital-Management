<?php

// cli-config.php
use Doctrine\ORM\Tools\Console\ConsoleRunner;

return ConsoleRunner::createHelperSet((require_once __DIR__.'/src/functions/getEntityManager.php')('hms', 'mysql'));