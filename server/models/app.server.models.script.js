var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var automationScriptsSchema   = new Schema({
    sle_id: String,
    created_by: {
        _id: {
            type: mongoose.Schema.ObjectId    /*,
            required: 'createdBy cannot be blank',
            trim: true*/
        },
        name: {
            type: String,
            default: 'Compro',
            trim: true,
            required: 'createdBy cannot be blank'
        }
    },
    modified_by: {
        _id: {
            type: mongoose.Schema.ObjectId/*,
            required: 'createdBy cannot be blank',
            trim: true*/
        },
        name: {
            type: String,
            default: 'Compro',
            trim: true,
            required: 'createdBy cannot be blank'
        }
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    last_modified: {
        type: Date,
        default: Date.now
    },
    task_json: []
});

module.exports = mongoose.model('AutomationScripts', automationScriptsSchema);

