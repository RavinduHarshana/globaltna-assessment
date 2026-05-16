import { Request, Response } from 'express';
import JobRequest from '../models/JobRequest';

// Create a new job request
export const createJob = async (req: Request, res: Response): Promise<any> => {
    try {
        const newJob = new JobRequest(req.body);
        const savedJob = await newJob.save();
        return res.status(201).json(
            {
                status: 'success',
                data: savedJob,
                message: 'Job created successfully',
                error: null
            }
        );
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            data: null,
            message: 'Error creating job',
            error: error instanceof Error ? error.message : 'Unknown error',

        });
    }
};

// Get all jobs
export const getJobs = async (req: Request, res: Response): Promise<any> => {
    try {
        const { category, status, search } = req.query; 
        let filter: any = {};

        if (category) filter.category = category;
        if (status) filter.status = status;

        
        if (search) {
            filter.$or = [
                { title: { $regex: search as string, $options: 'i' } },
                { description: { $regex: search as string, $options: 'i' } }
            ];
        }

        const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({ data: jobs });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching jobs', error });
    }
};

// Get Job by ID
export const getJobById = async (req: Request, res: Response): Promise<any> => {
    try {
        const job = await JobRequest.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        return res.status(200).json(
            {
                status: 'success',
                data: job,
                message: 'Job fetched successfully',
                error: null
            }
        );
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            data: null,
            message: 'Error fetching job',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Update Job status
export const updateJobStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { status } = req.body;
        const updatedJob = await JobRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!updatedJob) {
            return res.status(404).json({
                status: 'error',
                data: null,
                message: 'Job not found',
                error: null
            });
        }
        return res.status(200).json(
            {
                status: 'success',
                data: updatedJob,
                message: 'Job status updated successfully',
                error: null
            }
        );
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            data: null,
            message: 'Error updating job status',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// 5. Delete Job
export const deleteJob = async (req: Request, res: Response): Promise<any> => {
    try {
        const deletedJob = await JobRequest.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({
                status: 'error',
                data: null,
                message: 'Job not found',
                error: null
            });
        }
        return res.status(200).json(
            {
                status: 'success',
                data: null,
                message: 'Job deleted successfully',
                error: null
            }
        );
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            data: null,
            message: 'Error deleting job',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};