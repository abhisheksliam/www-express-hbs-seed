/**
 * Created by AbhishekK on 9/8/2016.
 */

var AutomationScripts     = require('./../models/app.server.models.script');

function getTaskDataFromDatabase(req, res, done){

    AutomationScripts.find({sle_id: req.params.task_id}, function(err, scriptData) {
        if (err) {
            done(err);
        } else {
            done(scriptData[0]);
        }
    });
};

exports.jsonToDistXml = function(req, res) {
    getTaskDataFromDatabase(req, res, function(scriptData) {

        var taskData = scriptData.task_json[0];

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

                            for(var k=0; k<taskData.items[i].methods[j].actions.length; k++){
                                if(taskData.items[i].methods[j].actions[k].init){

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

exports.jsonToDistJava = function(req, res) {

    getTaskDataFromDatabase(req, res, function(scriptData) {

        var taskData = scriptData.task_json[0];
        var pathwayListData = scriptData.task_json[1];

        if(!taskData || !taskData.items) {
            res.json({
                "errors": {
                    "errorMessage": "Task data not found",
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }
        else {
            var itemsInitCount = 0;
            for(var p=0;p<taskData.items.length;p++){
                if(taskData.items[p].init){
                    itemsInitCount++;
                }
            }

            var preJ = 'package testcase.' +
                taskData.appName +
                ';    import org.testng.annotations.Test;    import runner.TestRunner;    public class Test_' +
                ((taskData.id).replace(/\./gi, "_")).trim()

                +
                '_' +
                taskData.scenario.toUpperCase().trim()
                +
                ' extends TestRunner {    ';

            var postJout = ' }';

            var runJFinal = preJ;

            var testCount = 0;
            if(pathwayListData !== undefined){
                for (var q = 0; q < pathwayListData.length; q += 2) {
                    var arrayItem = pathwayListData[q];

                    if(arrayItem.constructor === Array){

                        var runJ = '';

                        var preJin = '\n    ' +
                            '@Test (groups = {"' + pathwayListData[q+1] + '"})' +
                            'public void ' +
                            ((taskData.id).replace(/\./gi, "_")).trim()
                            +
                            '_' +
                            (taskData.scenario.toUpperCase()).trim() + '_' + (++testCount).toString()
                            +
                            '() throws Exception {            System.out.println("START..");            ';

                        var postJ = 'Thread.sleep(3000);            ' +
                            'System.out.println("DONE.");        }   \n';

                        arrayItem.forEach(function (arrayItem2) {
                            runJ = runJ + 'executeItem(' +
                                '"' + taskData.id.trim() + '.' + taskData.scenario.trim() + '", ' +
                                '"' + taskData.scenario.trim() + '", ' +
                                '"' + arrayItem2.toString().split(',').join('","') + '"' +
                                ');';
                        });

                        runJFinal = runJFinal + (preJin + runJ + postJ );
                    }
                };
            }
            runJFinal = runJFinal + postJout;

            res.json(runJFinal);
        }

    });
};