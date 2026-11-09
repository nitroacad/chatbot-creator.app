<?php

namespace ChatbotCreator;

use PDO;
use Exception;

class Database
{
    private static ?PDO $instance = null;

    public static function getConnection(): PDO
    {
        if (self::$instance === null) {
            $driver = getenv('DB_DRIVER') ?: 'sqlite';

            if ($driver === 'sqlite') {
                $dbPath = getenv('DB_PATH') ?: __DIR__ . '/../database/app.sqlite';
                $dir = dirname($dbPath);
                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }
                self::$instance = new PDO("sqlite:" . $dbPath);
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                self::$instance->exec('PRAGMA foreign_keys = ON;');
            } else {
                $host = getenv('DB_HOST') ?: '127.0.0.1';
                $port = getenv('DB_PORT') ?: '3306';
                $database = getenv('DB_DATABASE') ?: 'chatbot_creator';
                $username = getenv('DB_USERNAME') ?: 'root';
                $password = getenv('DB_PASSWORD') ?: '';

                $dsn = "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";
                self::$instance = new PDO($dsn, $username, $password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
            }
        }

        return self::$instance;
    }

    public static function initializeSchema(): void
    {
        $pdo = self::getConnection();
        $schemaSql = file_get_contents(__DIR__ . '/../database/schema.sql');

        // Execute statements
        $queries = array_filter(array_map('trim', explode(';', $schemaSql)));
        foreach ($queries as $query) {
            if (!empty($query)) {
                $pdo->exec($query);
            }
        }
    }
}
