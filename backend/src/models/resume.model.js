import mongoose from 'mongoose';
const { Schema } = mongoose;

const ResumeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  template: { type: String },
  data: {
    personalInfo: { type: Object, default: {} },
    workExperience: { type: Array, default: [] },
    education: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    languages: { type: Array, default: [] },
    certifications: { type: Array, default: [] },
    projects: { type: Array, default: [] }
  }
}, { timestamps: true });

export default mongoose.model('Resume', ResumeSchema);