import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import { OnError, ErrorMessage, Configs, DestroyScheduleService, GetListScheduleService, StopScheduleService, StartScheduleService } from './refs';
import CreateScheduleService from './services/createSchedule.service';

export const app = express();

app.use(cors());
app.use(json());
app.use(OnError);

app.get('/ping', (_, res) => res.send({ app: Configs.APP_NAME, version: Configs.APP_VERSION, env: Configs.ENV }));

app.get('/', (req, res: any) => {
    GetListScheduleService(req.query.offset, req.query.limit)
        .then(result => res.send(result))
        .catch(res.onError);
});

app.post('/', (req, res: any) => {
    CreateScheduleService(req.body)
        .then(result => res.send(result))
        .catch(res.onError);
});

app.post('/:id/start', (req: any, res: any) => {
    StartScheduleService(req.params.id)
        .then(result => res.send(result))
        .catch(res.onError);
});

app.post('/:id/stop', (req: any, res: any) => {
    StopScheduleService(req.params.id)
        .then(result => res.send(result))
        .catch(res.onError);
});

app.delete('/:id', (req: any, res: any) => {
    DestroyScheduleService(req.params.id)
        .then(result => res.send(result))
        .catch(res.onError);
});

app.use((_, res) => res.status(404).send({ success: false, message: ErrorMessage.INVALID_ROUTE }));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error.stack)
    res.status(500).send({ success: false, message: ErrorMessage.INTERNAL_SERVER_ERROR });
});