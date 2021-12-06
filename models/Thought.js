const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reaction schema will be imbeded in thought model like ( reply was is comment model)
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
          },
          reactionBody: {
            type: String,
            required: true,
            max
          },
          username: {
            type: String,
            required: true
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
          }
    }
)



const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        // search how to structure the nested documents array
        reactions: {

        }

    }
);

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;