import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IChat extends Document {
  participants: {
    participantId: mongoose.Types.ObjectId;
    participantModel: "User" | "Admin";
  }[];
  messages: {
    sender: mongoose.Types.ObjectId;
    senderModel: "User" | "Admin";
    content: string;
    timestamp: Date;
    read: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema: Schema<IChat> = new Schema(
  {
    participants: [
      {
        _id: false,
        participantId: {
          type: Schema.Types.ObjectId,
          required: true,
          refPath: "participants.participantModel",
        },
        participantModel: {
          type: String,
          required: true,
          enum: ["User", "Admin"],
        },
      },
    ],
    messages: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          refPath: "messages.senderModel",
          required: true,
        },
        senderModel: {
          type: String,
          required: true,
          enum: ["User", "Admin"],
        },
        content: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        read: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index to efficiently query chats for a specific participant
chatSchema.index({ "participants.participantId": 1 });

const Chat: mongoose.Model<IChat> =
  models.Chat || model<IChat>("Chat", chatSchema);

export default Chat;