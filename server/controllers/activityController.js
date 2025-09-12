import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Activity from '../models/activityModel.js'
import { asyncWrapper } from '../util/asyncWrapper.js';
import mongoose from 'mongoose';

export const getAllActivities = asyncWrapper(async (req, res) => {
  const { search, category, sort } = req.query;

  const queryObj = {
    createdBy: req.user.userId
  };

  if (search) {
    queryObj.$or = [
      { activity: { $regex: search, $options: 'i' } },
      { notes: { $regex: search, $options: 'i' } }
    ];
  }

  if (category && category !== 'all') {
    queryObj.category = category;
  }

  const sortOptions = {
    newest: '-date',
    oldest: 'date',
    highest: '-emissions',
    lowest: 'emissions',
    'a-z': 'activity',        
    'z-a': '-activity',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const activities = await Activity.find(queryObj)
    .select('-createdBy -createdAt -updatedAt -__v') 
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalActivities = await Activity.countDocuments(queryObj);
  const pages = Math.ceil(totalActivities / limit);

  res.status(StatusCodes.OK).json({
    totalActivities, 
    pages, 
    currentPage: page,
    activities 
  });
});

export const getActivity = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const activity = await Activity.findById(id).select('-createdAt -updatedAt -createdBy -_v')

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

export const getActivitiesStats = asyncWrapper(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.userId);

  // user
  const [userStats] = await Activity.aggregate([
    { $match: { createdBy: userId } },
    {
      $group: {
        _id: null,
        totalEmissions: { $sum: "$emissions" },
        noOfActivities: { $sum: 1 },
        avgEmission: { $avg: "$emissions" },
      },
    },
  ]);

  const getDaysTotal = async (days) => {
    const lastDays = new Date();
    lastDays.setDate(lastDays.getDate() - days)

    const data = await Activity.aggregate([
      {
        $match: { createdBy: userId, createdAt: { $gte: lastDays } }
      },
      {
        $group: {
          _id: null,
          emissions: { $sum: "$emissions" }
        }
      }
    ])
    return data[0]?.emissions || 0
  }

  const weeklySummary = await getDaysTotal(7)
  const monthlySummary = await getDaysTotal(30)

  const [community] = await Activity.aggregate([
    {
      $group: {
        _id: "$createdBy",
        avg: { $avg: "$emissions" },
      },
    },
    {
      $group: {
        _id: null,
        communityAvg: { $avg: "$avg" },
      },
    },
  ]);

  res.status(StatusCodes.OK).json({
    userStats: userStats || {
      totalEmissions: 0,
      noOfActivities: 0,
      avgEmission: 0,
    },
    weeklySummary,
    monthlySummary,
    communityAvg: community ? community.communityAvg : 0,
  });
});