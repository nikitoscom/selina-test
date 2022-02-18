import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateMigration11645105799432 implements MigrationInterface {
  name = 'GenerateMigration11645105799432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`location\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`country\` varchar(2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`activity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`locationId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`booking_activity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, \`activityId\` int NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`hotel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`locationId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`hotelId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`booking_hotel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, \`roomId\` int NOT NULL, \`userId\` int NOT NULL, UNIQUE INDEX \`index_room_date\` (\`roomId\`, \`date\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_7bd49b3b937cda5b9921a44a959\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking_activity\` ADD CONSTRAINT \`FK_3e4d35967dc915974431b6b9093\` FOREIGN KEY (\`activityId\`) REFERENCES \`activity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking_activity\` ADD CONSTRAINT \`FK_54831c71d22e4bcab95f72621c5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`hotel\` ADD CONSTRAINT \`FK_22c5949683d16332ed263ed0970\` FOREIGN KEY (\`locationId\`) REFERENCES \`location\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`room\` ADD CONSTRAINT \`FK_2fac52abaa01b54156539cad11c\` FOREIGN KEY (\`hotelId\`) REFERENCES \`hotel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking_hotel\` ADD CONSTRAINT \`FK_3e29c78d703a1e5efd70cd5e165\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking_hotel\` ADD CONSTRAINT \`FK_215b1b217483335742d11fd457a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`booking_hotel\` DROP FOREIGN KEY \`FK_215b1b217483335742d11fd457a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking_hotel\` DROP FOREIGN KEY \`FK_3e29c78d703a1e5efd70cd5e165\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_2fac52abaa01b54156539cad11c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`hotel\` DROP FOREIGN KEY \`FK_22c5949683d16332ed263ed0970\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking_activity\` DROP FOREIGN KEY \`FK_54831c71d22e4bcab95f72621c5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking_activity\` DROP FOREIGN KEY \`FK_3e4d35967dc915974431b6b9093\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_7bd49b3b937cda5b9921a44a959\``,
    );
    await queryRunner.query(
      `DROP INDEX \`index_room_date\` ON \`booking_hotel\``,
    );
    await queryRunner.query(`DROP TABLE \`booking_hotel\``);
    await queryRunner.query(`DROP TABLE \`room\``);
    await queryRunner.query(`DROP TABLE \`hotel\``);
    await queryRunner.query(`DROP TABLE \`booking_activity\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`activity\``);
    await queryRunner.query(`DROP TABLE \`location\``);
  }
}
