var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
   let data =[{
        // Request_time:"2021-02-15",
        Request_time:"1562869487000",
        API:"Vision",
        Uri:"vision/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"7500"
    },
    {
        // Request_time:"2021-02-15",
        Request_time:"1569863577000",
        API:"Vision",
        Uri:"vision/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"7500" 
    },
    {
        // Request_time:"2022-02-15",
        Request_time:"1529904463000",
        API:"hmi",
        Uri:"hmi/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"4800"
    },
    {
        // Request_time:"2022-02-15",
        Request_time:"1569905303000",
        API:"hmi",
        Uri:"hmi/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"4800"
    },
    {
        // Request_time:"2020-02-15",
        Request_time:"1570442582000",
        API:"asr",
        Uri:"asr/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"400",
        Latency:"0"
    },
    {
        // Request_time:"2020-02-15",
        Request_time:"1569849971000",
        API:"asr",
        Uri:"asr/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"400",
        Latency:"0"
    },
    {
        // Request_time:"2021-02-15",
        Request_time:"1569869487000",
        API:"Vision",
        Uri:"vision/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"7500"
    },
    {
        // Request_time:"2021-02-15",
        Request_time:"1569869577000",
        API:"Vision",
        Uri:"vision/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"7500" 
    },
    {
        // Request_time:"2022-02-15",
        Request_time:"1569904463000",
        API:"hmi",
        Uri:"hmi/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"4800"
    },
    {
        // Request_time:"2022-02-15",
        Request_time:"1564866667000",
        API:"hmi",
        Uri:"hmi/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"4800"
    },
    {
        // Request_time:"2020-02-15",
        Request_time:"1564866667000",
        API:"asr",
        Uri:"asr/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"400",
        Latency:"0"
    },
    {
        // Request_time:"2020-02-15",
        Request_time:"1469849971000",
        API:"asr",
        Uri:"asr/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"400",
        Latency:"0"
    },]
    res.json({data:data});
});

// router.get('/:id', function (req, res, next) {

// });

module.exports = router;