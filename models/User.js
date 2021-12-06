const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Must be a valid email address'],
            // look at regex docs for email validation - M.17 challenge is exactly this
            validate: {
                validator(validEmail) {
                  return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
                    validEmail
                  );
                },
              },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }],
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
    return this.friends.length
  })

  
  const User = model('User', UserSchema);
  
  module.exports = User;