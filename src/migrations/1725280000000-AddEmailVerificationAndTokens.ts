import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';

export class AddEmailVerificationAndTokens1725280000000 implements MigrationInterface {
  name = 'AddEmailVerificationAndTokens1725280000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('candidates', [
      new TableColumn({
        name: 'email_verified_at',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
      new TableColumn({
        name: 'email_verification_token',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'email_verification_expires_at',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
      new TableColumn({
        name: 'password_reset_token',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'password_reset_expires_at',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    ]);

    await queryRunner.createIndices('candidates', [
      new TableIndex({
        name: 'IDX_candidates_email_verification_token',
        columnNames: ['email_verification_token'],
      }),
      new TableIndex({
        name: 'IDX_candidates_password_reset_token',
        columnNames: ['password_reset_token'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('candidates', 'IDX_candidates_password_reset_token');
    await queryRunner.dropIndex('candidates', 'IDX_candidates_email_verification_token');
    await queryRunner.dropColumns('candidates', [
      'password_reset_expires_at',
      'password_reset_token',
      'email_verification_expires_at',
      'email_verification_token',
      'email_verified_at',
    ]);
  }
}
