import { Ignitor } from '@discord-factory/core-next';

const dotenv = require('dotenv');

dotenv.config();
const ignitor = new Ignitor();
ignitor.createFactory();