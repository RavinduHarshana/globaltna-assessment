import request from 'supertest';
import express from 'express';
import { describe, expect, it, jest } from '@jest/globals';
import jobRoutes from '../routes/jobRoutes';
import JobRequest from '../models/JobRequest';

// Express app eka test eka athulema hadagannawa
const app = express();
app.use(express.json());
app.use('/api/jobs', jobRoutes);

// Real database ekata connect wenne nathi wenna Mongoose model eka mock karanawa
jest.mock('../models/JobRequest');

describe('Job API Endpoints', () => {

    //Get all jobs
    it('GET /api/jobs - should return all jobs with 200 status', async () => {
        const mockJobs = [{ title: 'Test Job', category: 'Plumbing', status: 'Open' }];
        (JobRequest.find as jest.Mock).mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockJobs as never)
        });

        const res = await request(app).get('/api/jobs');

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toEqual(mockJobs);
    });

    // add job not auth
    it('POST /api/jobs - should fail with 401 without authentication token', async () => {
        const res = await request(app)
            .post('/api/jobs')
            .send({
                title: 'New Job',
                description: 'Test Desc',
                contactEmail: 'test@test.com'
            });

        expect(res.statusCode).toEqual(401);
    });

    // get job by id
    it('GET /api/jobs/:id - should return a job by id with 200 status', async () => {
        const mockJob = { _id: '123', title: 'Test Job', category: 'Plumbing', status: 'Open' };

        (JobRequest.findById as jest.Mock).mockResolvedValue(mockJob as never);

        const res = await request(app).get('/api/jobs/123');

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toEqual(mockJob);
    });

    // delete joj
    it('DELETE /api/jobs/:id - should fail with 401 without authentication token', async () => {
        const res = await request(app)
            .delete('/api/jobs/123');

        expect(res.statusCode).toEqual(401);
    });

    


});