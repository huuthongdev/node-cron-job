import request from 'supertest';
import { deepEqual } from 'assert';

import { app } from '../src/refs';

describe.only('POST / -> Create schedule', () => {
    it('SUCCESS', async () => {
        const response = await request(app)
            .post('/')
            .send({
                "apiURL": "https://api.dev.rebateton.com",
                "method": "get",
                "cronExpression": "50 * * * * *",
                "frequency": 2,
                "payload": {},
                "description": "Testing"
            });

        const { body } = response;

        // console.log(body);
    });
})