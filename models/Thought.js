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
            maxlength: 280
          },
          username: {
            type: String,
            required: true,
            // for white space
            trim: true
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
          }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const ThoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // search how to structure the nested documents array
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

// look at M.18 virtual - lokk to add reaction count like a reply count to comment model
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;