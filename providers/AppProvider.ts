import { BaseProvider, EntityResolvable } from 'ioc:factory/Core/Provider';
import Logger from '@leadcodedev/logger';
import { connectDatabase } from 'App/database/Database';

export default class AppProvider implements BaseProvider {
  public async boot(): Promise<void> {
    Logger.send('info', 'Application starting...');
    if (await connectDatabase()) {
      Logger.send('info', 'Database connected.');
    }
    else {
      Logger.send('error', 'Failed to connect to database.');
    }
  }
  
  public async load(Class: EntityResolvable): Promise<void> {
    Logger.send('info', `Load file ${Class.file?.relativePath}`);
  }

  public async ok(): Promise<void> {
    Logger.send('info', 'Application is ready.');
  }
}