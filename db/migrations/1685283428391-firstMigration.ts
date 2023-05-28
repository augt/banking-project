import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1685283428391 implements MigrationInterface {
  name = 'FirstMigration1685283428391';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "moneytransaction" ("id" SERIAL NOT NULL, "orderer" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isCanceled" boolean NOT NULL DEFAULT false, "debitedAccountId" uuid, "creditedAccountId" uuid, CONSTRAINT "PK_c28b27230584073066ddad9b394" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isBlocked" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "institution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "privateKey" character varying NOT NULL, CONSTRAINT "PK_f60ee4ff0719b7df54830b39087" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "moneytransaction" ADD CONSTRAINT "FK_996dcd25b395a83d8dceee14e85" FOREIGN KEY ("debitedAccountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "moneytransaction" ADD CONSTRAINT "FK_11721fc671d99b069b1e294dfe3" FOREIGN KEY ("creditedAccountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`,
    );
    await queryRunner.query(
      `ALTER TABLE "moneytransaction" DROP CONSTRAINT "FK_11721fc671d99b069b1e294dfe3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "moneytransaction" DROP CONSTRAINT "FK_996dcd25b395a83d8dceee14e85"`,
    );
    await queryRunner.query(`DROP TABLE "institution"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "moneytransaction"`);
  }
}
