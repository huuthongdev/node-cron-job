import request from 'supertest';

import { app } from '../src/refs';

describe.only('POST / -> Create schedule', () => {
    it('SUCCESS', async () => {
        const response = await request(app)
            .post('/')
            .send({
                "apiURL": "https://facebook.com",
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