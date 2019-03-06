const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    username: {type: String, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    password: String,
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    active: {type: String, default: "Inactive"},
    games: {type: [{id:Number, start_date:String}], default: []},
    scores: {type: [ Number ], default: [0, 0, 0] },
    sess_id: String,
    grid: []
});

module.exports = mongoose.model('Users', Users);

// email: {
//     type: String,
//         validate: {
//         validator: function (v) {
//             return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v);
//         },
//         message: props => `${props.value} is not a valid email!`
//     },
//     required: [true, 'Email required']
// },