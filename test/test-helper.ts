import { connectPostgresDatabase } from '../src/refs';

before(async () => {
    await connectPostgresDatabase(true);
});