const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    username: {type: String, index: true, unique: true},
    password: String,
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'Email required']
    },
    active: {type: String, default: "Inactive"},
    games: {type: [{id:Number, start_date:String}], default: []},
    scores: {type: [ Number ], default: [0, 0, 0] },
    sess_id: String
});

module.exports = mongoose.model('Users', Users);