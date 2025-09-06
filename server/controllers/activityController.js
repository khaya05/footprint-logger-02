import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Activity from '../models/activityModel.js'
import { asyncWrapper } from '../util/asyncWrapper.js';

export const getAllActivities = asyncWrapper(async (req, res) => {
  const activities = await Activity.find({ createdBy: req.user.userId })
  res.status(StatusCodes.OK).json({ activities })
})

export const getActivity = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const activity = await Activity.findById(id)

  if (!activity) throw new NotFoundError(`no activity with id: ${id}`)
  res.status(StatusCodes.OK).json({ activity })
})

export const createActivity = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId
  const activity = await Activity.create(req.body)
  res.status(StatusCodes.CREATED).json({ activity })
})

export const updateActivity = asyncWrapper(async (req, res) => {
  const { id } = req.params
  const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true })

  if (!activity) throw new NotFoundError(`no activity with id: ${id}`)
  res.status(StatusCodes.OK).json({ activity })
})

export const deleteActivity = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const activity = await Activity.findByIdAndDelete(id);

  if (!activity) if (!activity) throw new NotFoundError(`no activity with id: ${id}`)

  res.status(StatusCodes.OK).json({ msg: 'Activity deleted successfully' });
});