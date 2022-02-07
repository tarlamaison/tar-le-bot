import { createConnection } from 'typeorm';

export async function connectDatabase(): Promise<boolean> {
  try {
    await createConnection();
    return true;
  } catch (e) {
    throw e;
  }
}