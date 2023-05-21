const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});
userSchema.statics.login= async function(email , password){
  const user = await this.findOne({email})
  if(user){
    const validPassword = await bcrypt.compare(password , user.password)
    if(validPassword){
      return user
    }
    throw Error('Incorrect Password')
  }
  throw Error('Incorrect Email')
}

const User = mongoose.model('User', userSchema);

module.exports = User;
