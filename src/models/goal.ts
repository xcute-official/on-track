import { IGoal } from '@/types';
import mongoose, { Schema } from 'mongoose';
import { required } from 'zod/v4-mini';
const journeySchema = new Schema({
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true,
  },
  skips: {
    onWeeks: [
      {
        type: Number
      }
    ],
    onEvents: [
      {
        type: String
      }
    ]
  }
}, {
  timestamps: false,
  _id: false
});
const taskSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: false,
  _id: false
});
const goalSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    journey: journeySchema,
    tasklist: [taskSchema],
    completionsIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Completion"
      }
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },{
    timestamps: true
  }
)
const completeSchema = new Schema(
  {
    id: {
      type: Number,
      required: true
    }
  },{
    _id: false,
    timestamps: {
      createdAt: false,
      updatedAt: true
    }
  }
)
const completionSchema = new Schema(
  {
    forDay: {
      type: String,
      required: true
    },
    completes: [completeSchema],
    goalId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Goal"
    } 
  },{
    timestamps: false
  }
)
export const Completion = mongoose.models.Completion || mongoose.model("Completion", completionSchema);
export const Goal = mongoose.models.Goal || mongoose.model<IGoal>("Goal", goalSchema);