/**
 * Created by AbhishekK on 9/8/2016.
 */

var AutomationScripts     = require('./../models/app.server.models.script');

function getTaskDataFromDatabase(req, res, done){

    AutomationScripts.find({sle_id: req.params.task_id}, function(err, scriptData) {
        if (err) {
            done(err);
        } else {
            done(scriptData[0].task_json[0]);
            console.log(scriptData[0].task_json[0]);
        }
    });
};

exports.jsonToDistXml = function(req, res) {

    getTaskDataFromDatabase(req, res, function(taskData) {

        if(!taskData || !taskData.items) {
            res.json({
                "errors": {
                    "errorMessage": "Task data not found",
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }
        else {

            var xmlPre = '<?xml version="1.0" encoding="UTF-8"  standalone="no"?><Task TemplateVersion="V1" id="'+ taskData.id +'" name="'+ taskData.name +'">  <description>'+ taskData.description +'</description>  <friendlyTaskID>'+ taskData.id + '.'+taskData.scenario +'</friendlyTaskID>  <scenario name="'+ taskData.scenario +'">';
            var xmlPost =   '</scenario>    </Task>';

            var itemsInitCount = 0;
            for(var p=0;p<taskData.items.length;p++){

                if(taskData.items[p].init){
                    itemsInitCount++;
                }
            }

            var taskDataPre = '<Items count="'+itemsInitCount+'">';
            var taskDataPost = '</Items>';

            for(var i=0;i<taskData.items.length;i++){

                if(taskData.items[i].init){

                    taskDataPre = taskDataPre + '<Item sno="'+(i+1)+'">';

                    for(var j=0;j<taskData.items[i].methods.length;j++){

                        var jin=0;

                        if(taskData.items[i].methods[j].init){
                            taskDataPre = taskDataPre + '<Method group="'+taskData.items[i].methods[j].group+'" name="'+taskData.items[i].methods[j].type+'" sno="'+(j+1)+'"><Actions>';

                            //var methodChecked = $('input[name="item'+(i+1)+'-method"]:checked', '#item'+(i+1)+'-methods').data('method');

                            for(var k=0; k<taskData.items[i].methods[j].actions.length; k++){
                                if(taskData.items[i].methods[j].actions[k].init){

                                    /*                                if(i>0 && jin==0){
                                     if(taskData.items[i-1].skip == true){
                                     if(methodChecked == (j+1)){
                                     jin = getNumberOfItemsToSkip(i);
                                     for(var _jin=0; _jin < jin;_jin++){
                                     taskDataPre = taskDataPre + '<Action sno="'+(_jin+1)+'"><actionType name="skiptonextitem"></actionType></Action>';
                                     }
                                     }
                                     };
                                     }*/
                                    taskDataPre = taskDataPre + '<Action sno="'+(k+jin+1)+'"><actionType name="'+(taskData.items[i].methods[j].actions[k].name).toString().trim().replace("()","")+'">';

                                    for(var l=0;l<taskData.items[i].methods[j].actions[k].values.length;l++){
                                        taskDataPre = taskDataPre + '<'+taskData.items[i].methods[j].actions[k].values[l].actKey+'>'+taskData.items[i].methods[j].actions[k].values[l].actVal+'</'+taskData.items[i].methods[j].actions[k].values[l].actKey+'>';
                                    }
                                    taskDataPre = taskDataPre + '</actionType></Action>';
                                }
                            }
                            taskDataPre = taskDataPre + '</Actions></Method>';
                        }
                    }
                    taskDataPre = taskDataPre + '</Item>';
                }
            }

            var updatedRunXml = xmlPre + taskDataPre + taskDataPost + xmlPost;

            res.json(updatedRunXml);
        }

    });
};