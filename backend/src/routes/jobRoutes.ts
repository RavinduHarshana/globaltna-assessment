import express from 'express';
import { 
  createJob, 
  getJobs, 
  getJobById, 
  updateJobStatus, 
  deleteJob 
} from '../controllers/jobController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();


router.get('/', getJobs);
router.get('/:id', getJobById);


router.post('/', protect, createJob);
router.patch('/:id', protect, updateJobStatus);
router.delete('/:id', protect, deleteJob);

export default router;