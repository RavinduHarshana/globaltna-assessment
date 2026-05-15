import mongoose = require('mongoose');

interface IJobRequest extends mongoose.Document {
    title: string;
    description: string;
    category?: string;
    location?: string;
    contactName?: string;
    contactEmail?: string;
    status: 'Open' | 'In Progress' | 'Closed';
    createdAt: Date;
    updatedAt: Date;
}

const JobRequestSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    category: {
        type: String
    },
    location: {
        type: String
    },
    contactName: {
        type: String
    },
    contactEmail: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        default: 'Open'
    }
}, {
    timestamps: true
});

const JobRequest = mongoose.model<IJobRequest>('JobRequest', JobRequestSchema);

export = JobRequest;