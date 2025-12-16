import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const PageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    heading: { type: String },
    slug: { type: String, required: true, unique: true },
    type: { type: String },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    components: [ComponentSchema],
  },
  { timestamps: true }
);

export const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
