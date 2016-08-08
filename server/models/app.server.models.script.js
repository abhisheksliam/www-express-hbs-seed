var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var taskJsonSchema   = new Schema({
    taskid: String,
    json: []
});

/*
 var taskJsonSchema   = new Schema({
 taskid: String,
 json: [
 	{
 items: [ItemDetailSchema]
 },
 []
]
});

Should be extend Schema?
var ItemDetailSchema = new Schema({
    items: {
        text: String,
        skip: Boolean,
        init: Boolean,
        methods: [MethodDetailSchema]
    }
 });

var MethodDetailSchema = new Schema({
    methods: {
        balooActions: [BalooActionSchema],
        actions: [TriggerDetailSchema]
    }


});

var BalooActionSchema = new Schema({
    balooActions: { }
});


var TriggerDetailSchema = new Schema({
    actions: { }
});
*/
module.exports = mongoose.model('TaskJson', taskJsonSchema);

