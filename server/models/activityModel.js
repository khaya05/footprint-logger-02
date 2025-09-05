import mongoose from 'mongoose'

const ActivitySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['transport', 'food', 'energy', 'digital']
    },
    activity: String,
    amount: Number,
    unit: String,
    emissions: Number,
    date: Date,
    notes: String,
    // createdBy: {
    //   type: mongoose.Types.ObjectId
    // }

  }, { timestamps: true }
)

export default mongoose.model('Activity', ActivitySchema)