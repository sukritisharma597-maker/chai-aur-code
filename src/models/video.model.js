import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const videoSchema = new Schema({

videofile: {
        type: String,//cloudinary url
        required: true
},
thumbnail: {
        type: String,//cloudinary url
        required: true
},
title: {
        type: String,
        required: true,
},
description: {
        type: String,
        required: true,
},
duration: {
        type: Number,
        required: true,
},
views: {
        type: Number,
        default: 0
},
ispublished: {
        type: Boolean,
        default: false
},
owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
},

}, {timestamps: true})

videoSchema.plugin(mongoosePaginate)

export const Video = mongoose.model('Video', videoSchema)