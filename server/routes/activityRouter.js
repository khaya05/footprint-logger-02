import { Router } from "express";
import { createActivity, deleteActivity, getActivity, getAllActivities, updateActivity } from "../controllers/activityController.js";
const router = Router()

router.route('/').get(getAllActivities).post(createActivity)
router.route('/:id').get(getActivity).patch(updateActivity).delete(deleteActivity)

export default router