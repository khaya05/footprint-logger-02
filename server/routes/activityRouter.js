import { Router } from "express";
import { createActivity, deleteActivity, getActivity, getAllActivities, updateActivity } from "../controllers/activityController.js";
import { validateActivityQuery, validateCreateActivity, validateDeleteActivity, validateGetActivity, validateUpdateActivity } from "../middleware/activityValidation.js";
const router = Router()

router.route('/')
  .get(validateActivityQuery, getAllActivities)
  .post(validateCreateActivity, createActivity)

router.route('/:id')
  .get(validateGetActivity, getActivity)
  .patch(validateUpdateActivity, updateActivity)
  .delete(validateDeleteActivity, deleteActivity)

export default router