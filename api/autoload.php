<?php
// api/autoload.php

/**
 * @param string $path
 * @return array
 */
function loadEnv(string $path): array {
    if(!file_exists($path)){
        return [];
    }
    $config = [];
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach($lines as $line){
        if(strpos(trim($line), '#') === 0){
            continue;
        }
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        $value = trim($value, '"\'');

        $config[$name] = $value;
        putenv("{$name}={$value}");
        $_ENV[$name] = $value;
        $_SERVER[$name] = $value;
    }
    
    return $config;
}
return loadEnv(__DIR__ . '/.env');