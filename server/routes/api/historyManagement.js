var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
   let data =[{
        Request_time:"2021",
        API:"Vision",
        Uri:"vision/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"7500"
    },
    {
        Request_time:"2021",
        API:"Vision",
        Uri:"vision/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"7500" 
    },
    {
        Request_time:"2022",
        API:"hmi",
        Uri:"hmi/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"4800"
    },
    {
        Request_time:"2022",
        API:"hmi",
        Uri:"hmi/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"4800"
    },
    {
        Request_time:"2020",
        API:"asr",
        Uri:"asr/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"400",
        Latency:"0"
    },
    {
        Request_time:"2020",
        API:"asr",
        Uri:"asr/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"400",
        Latency:"0"
    },
    {
        Request_time:"2021",
        API:"Vision",
        Uri:"vision/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"7500"
    },
    {
        Request_time:"2021",
        API:"Vision",
        Uri:"vision/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"7500" 
    },
    {
        Request_time:"2022",
        API:"hmi",
        Uri:"hmi/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"4800"
    },
    {
        Request_time:"2022",
        API:"hmi",
        Uri:"hmi/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"200",
        Latency:"4800"
    },
    {
        Request_time:"2020",
        API:"asr",
        Uri:"asr/fpt",
        Method:"POST",
        Request_body:"request body data",
        Status:"400",
        Latency:"0"
    },
    {
        Request_time:"2020",
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