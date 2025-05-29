import mongoose from 'mongoose';
import Counter from './counter.js';

const planSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true, 
        immutable: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    planData: {
        title: { type: String },
        date: { type: Date, default: Date.now },
        time: { type: String},
        description: { type: String },
        links: { type: String },
        location: { type: String },
        completed: { type: String, default: "No" },
        isGoogleCalendarEvent: { type: String, default: "No" },
        googleCalendarId: { type: String, default: "" }
    }
})

planSchema.pre('save', async function (next) {
    const doc = this;
    if (doc.isNew) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: 'userId' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
  
        doc.userId = counter.seq;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });

const Plan = mongoose.model('Plan', planSchema)

export default Plan;