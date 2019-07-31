<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190724065600 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('CREATE TEMPORARY TABLE __temp__weather AS SELECT id, lon, lat, dt, name, country, main, description, temperature, pressure, humidity, wind_speed, wind_deg, clouds FROM weather');
        $this->addSql('DROP TABLE weather');
        $this->addSql('CREATE TABLE weather (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, lon NUMERIC(10, 2) NOT NULL, lat NUMERIC(10, 2) NOT NULL, dt INTEGER NOT NULL, name VARCHAR(255) NOT NULL COLLATE BINARY, country VARCHAR(2) NOT NULL COLLATE BINARY, main VARCHAR(255) NOT NULL COLLATE BINARY, description VARCHAR(255) NOT NULL COLLATE BINARY, temperature NUMERIC(10, 2) NOT NULL, pressure NUMERIC(10, 2) NOT NULL, humidity INTEGER NOT NULL, wind_speed NUMERIC(10, 2) NOT NULL, clouds INTEGER NOT NULL, wind_deg NUMERIC(10, 2) NOT NULL)');
        $this->addSql('INSERT INTO weather (id, lon, lat, dt, name, country, main, description, temperature, pressure, humidity, wind_speed, wind_deg, clouds) SELECT id, lon, lat, dt, name, country, main, description, temperature, pressure, humidity, wind_speed, wind_deg, clouds FROM __temp__weather');
        $this->addSql('DROP TABLE __temp__weather');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('CREATE TEMPORARY TABLE __temp__weather AS SELECT id, lon, lat, dt, name, country, main, description, temperature, pressure, humidity, wind_speed, wind_deg, clouds FROM weather');
        $this->addSql('DROP TABLE weather');
        $this->addSql('CREATE TABLE weather (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, lon NUMERIC(10, 2) NOT NULL, lat NUMERIC(10, 2) NOT NULL, dt INTEGER NOT NULL, name VARCHAR(255) NOT NULL, country VARCHAR(2) NOT NULL, main VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, temperature NUMERIC(10, 2) NOT NULL, pressure NUMERIC(10, 2) NOT NULL, humidity INTEGER NOT NULL, wind_speed NUMERIC(10, 2) NOT NULL, clouds INTEGER NOT NULL, wind_deg INTEGER NOT NULL)');
        $this->addSql('INSERT INTO weather (id, lon, lat, dt, name, country, main, description, temperature, pressure, humidity, wind_speed, wind_deg, clouds) SELECT id, lon, lat, dt, name, country, main, description, temperature, pressure, humidity, wind_speed, wind_deg, clouds FROM __temp__weather');
        $this->addSql('DROP TABLE __temp__weather');
    }
}
