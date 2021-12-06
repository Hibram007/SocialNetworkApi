const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        userName: {
            type: string,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: string,
            required: [true, 'Must be a valid email address'],
            trim: true,
            unique: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ]
    },
    {
        friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// Check on this structure to make sure it refrences the friends array correctly

// get total count of friends and on retrieval
UserSchema.virtual('friendCount').get(function() {
    //.reduce() method tallys up the total of every comment with its replies
    return this.friends.reduce((total, comment) => total + comment.replies.length + 1, 0);
  });
  
  const User = model('User', UserSchema);
  
  module.exports = User;