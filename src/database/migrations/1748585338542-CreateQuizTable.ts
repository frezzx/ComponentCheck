import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateQuizStructureMigration1748580000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // quizzes
    await queryRunner.createTable(
      new Table({
        name: 'quizzes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          {
            name: 'difficulty',
            type: 'enum',
            enum: ['easy', 'medium', 'hard'],
            default: `'easy'`,
          },
          {
            name: 'componentId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'quizzes',
      new TableForeignKey({
        columnNames: ['componentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'components',
        onDelete: 'SET NULL',
      }),
    );

    // questions
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'question', type: 'varchar' },
          { name: 'quizId', type: 'int' },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'questions',
      new TableForeignKey({
        columnNames: ['quizId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'quizzes',
        onDelete: 'CASCADE',
      }),
    );

    // answers
    await queryRunner.createTable(
      new Table({
        name: 'answers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'text', type: 'varchar' },
          { name: 'isCorrect', type: 'boolean', default: false },
          { name: 'questionId', type: 'int' },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'answers',
      new TableForeignKey({
        columnNames: ['questionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'questions',
        onDelete: 'CASCADE',
      }),
    );

    // quiz_performance
    await queryRunner.createTable(
      new Table({
        name: 'quiz_performance',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'userId', type: 'int' },
          { name: 'quizId', type: 'int' },
          { name: 'category', type: 'varchar' },
          { name: 'totalQuestions', type: 'int' },
          { name: 'correctAnswers', type: 'int' },
          { name: 'elapsedTime', type: 'int' },
          { name: 'score', type: 'int' },
          {
            name: 'attemptedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('quiz_performance', [
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['quizId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'quizzes',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('quiz_performance');
    await queryRunner.dropTable('answers');
    await queryRunner.dropTable('questions');
    await queryRunner.dropTable('quizzes');
  }
}
