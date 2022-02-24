import { Ignitor } from '@discord-factory/core-next';
import dotenv from 'dotenv';

dotenv.config();
const ignitor = new Ignitor();
ignitor.createFactory();