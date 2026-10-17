import mongoose,{ Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
       index: true
    },
    avatar: {
        type: String,
        required: true
    },
    coverimage: {
        type: String,
        required: true
    },
    watchhistory: {
        type: [Schema.Types.ObjectId],
        ref: 'Video',
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    resetPasswordToken: {
        type: String,
    },


},
{
    timestamps: true,
}
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    const payload = {
        id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    };
    const accessToken = jwt.sign(payload, process.env.Access_Token_Secret, {
        expiresIn: process.env.Access_Token_Expiration,
    });
    return accessToken;
};

export const User = mongoose.model('User', userSchema);