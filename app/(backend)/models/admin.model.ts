import mongoose, { Document, Model } from 'mongoose';
import './property.model';

// Interface for the Admin document
export interface IAdmin extends Document {
    name: string;
    email: string;
    profilePhoto?: string;
    password?: string;
    phoneNo: string;
    role: 'superadmin' | 'admin' | 'moderator';
    experience: number;
    propertySold: number;
    properties: mongoose.Schema.Types.ObjectId[];
    bio: string;
    specialization: 'all' | 'residential' | 'commercial' | 'industrial' | 'land' | 'rental';
    isVerified: boolean;
    phoneVerificationCode?: string;
    emailVerified: boolean;
    emailVerificationCode?: string;
}

const adminSchema = new mongoose.Schema<IAdmin>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
            required: true,
        },
        profilePhoto: {
            type: String,
        },
        password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters long'],
            required: true,
        },
        phoneNo: {
            type: String,
            required: [true, 'Phone number is required'],
            unique: true,
            match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],
        },
        role: {
            type: String,
            enum: ['superadmin', 'admin', 'moderator'],
            default: 'admin',
        },
        experience: {
            type: Number,
            required: true,
        },
        propertySold: {
            type: Number,
            required: true,
            default: 0,
        },
        properties: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Property',
            }
        ],
        bio: {
            type: String,
            default: "No bio added yet",
            required: true,
        },
        specialization: {
            type: String,
            enum: ['all', 'residential', 'commercial', 'industrial', 'land', 'rental'],
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        phoneVerificationCode: {
            type: String,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationCode: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
