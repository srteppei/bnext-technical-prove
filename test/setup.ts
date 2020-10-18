import { getConnection } from 'typeorm';

afterAll(async () => {
  const connection = await getConnection();
  await connection.query('SET FOREIGN_KEY_CHECKS=0;');
  const entities = connection.entityMetadatas.map( entity => ({name: entity.name, tableName: entity.tableName}));
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const repository = await connection.getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE \`${entity.tableName}\`;`);
  }
  await connection.query('SET FOREIGN_KEY_CHECKS=1;');
});