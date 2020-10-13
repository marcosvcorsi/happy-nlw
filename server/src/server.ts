import path from 'path';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorHandler } from './errors/handler';

import './database/connection';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(routes);

app.use(errorHandler);

app.listen(3333, () => console.log('Server is running on port 3333'));
