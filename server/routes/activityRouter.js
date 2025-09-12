import { Router } from 'express';
import {
  createActivity,
  deleteActivity,
  getActivitiesStats,
  getActivity,
  getAllActivities,
  updateActivity,
} from '../controllers/activityController.js';
import {
  validateActivityQuery,
  validateCreateActivity,
  validateDeleteActivity,
  validateGetActivity,
  validateUpdateActivity,
} from '../middleware/validationMiddleware.js';
const router = Router();

router.route('/stats').get(getActivitiesStats);

router
  .route('/')
  .get(validateActivityQuery, getAllActivities)
  .post(validateCreateActivity, createActivity);

router
  .route('/:id')
  .get(validateGetActivity, getActivity)
  .patch(validateUpdateActivity, updateActivity)
  .delete(validateDeleteActivity, deleteActivity);

export default router;
