import express from 'express';
import { 
  createJob, 
  getJobs, 
  getJobById, 
  updateJobStatus, 
  deleteJob 
} from '../controllers/jobController';

const router = express.Router();


router.post('/', createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.patch('/:id', updateJobStatus);
router.delete('/:id', deleteJob);

export default router;