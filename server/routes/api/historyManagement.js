var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
const awsHttpClient = require('http-aws-es');
const {Client} = require('@elastic/elasticsearch')
// const fetch = require('node-fetch');

router.get('/', function (req, res, next) {
    var allRecords = [];
    // var auth = 'kibanaro:zN95CNXHuL8wHFhiYGWiBdkRD';
    // var port = 9201;
    // var protocol = 'http';
    // var hostUrls = [
    //     'ec2-3-1-125-56.ap-southeast-1.compute.amazonaws.com'
    // ];
    //
    // var hosts = hostUrls.map(function (host) {
    //     return {
    //         protocol: protocol,
    //         host: host,
    //         port: port,
    //         auth: auth
    //     };
    // });


    const client = new Client({
        node: 'http://ec2-3-1-125-56.ap-southeast-1.compute.amazonaws.com:9201',
        auth: {
            username: 'ekyc_vpbank',
            password: 'R87L3x3bozGsdM3sq9UTOtnsBn9Ch4Fb'
        }
    });


    // var client = new elasticsearch.Client({
    //     hosts: hosts
    // });


    // let client = elasticsearch.Client({
    //     host: 'ec2-3-1-125-56.ap-southeast-1.compute.amazonaws.com',
    //     connectionClass: awsHttpClient,
    //     auth: {
    //         username: "ekyc_vpbank",
    //         password: "R87L3x3bozGsdM3sq9UTOtnsBn9Ch4Fb",
    //     },
    //     });

    // const client = new elasticsearch.Client({
    //     node: 'ec2-3-1-125-56.ap-southeast-1.compute.amazonaws.com',
    //     auth: {
    //         username: "ekyc_vpbank",
    //         password: "R87L3x3bozGsdM3sq9UTOtnsBn9Ch4Fb",
    //     },
    // });


// callback API
    client.search({
        index: 'kong-12-*',
        scroll: '10s',
        body: {
            "_source": ["@timestamp", "_id", "consumer.project", "service.name", "response.status", "response.body", "_source"],
            "sort": [
                {
                    "@timestamp": {
                        "order": "asc"
                    }
                }
            ],
            "query": {
                "bool": {
                    "must": [
                        {
                            "prefix": {
                                "service.name": "dmp.facesearch.v2"
                            }
                        },
                        {
                            "prefix": {
                                "request.uri": "/dmp/facesearch/v2/search"
                            }
                        },
                        {
                            "range": {
                                "@timestamp": {
                                    "gte": 1596914650,
                                    "lt": 1597027697134
                                }
                            }
                        },
                        {
                            "term": {
                                "consumer.username": "quanglh4@vpbank.com.vn"
                            }
                        }

                    ]
                }
            }
        }
    }, function getMoreUntilDone(error, response) {
        // collect all the records
        response.body.hits.hits.forEach(function (hit) {
            allRecords.push(hit);
        });

        if (response.body.hits.total !== allRecords.length) {
            // now we can call scroll over and over
            client.scroll({
                scrollId: response._scroll_id,
                scroll: '10s'
            }, getMoreUntilDone);
        } else {
            console.log('all done', allRecords);
        }
    });


    // client.search({
    //     index: 'kong-12-*',
    //     scroll: '30s',
    //     body: {
    //         "_source": ["@timestamp", "_id", "consumer.project", "service.name", "response.status", "response.body", "_source"],
    //         "sort": [
    //             {
    //                 "@timestamp": {
    //                     "order": "asc"
    //                 }
    //             }
    //         ],
    //         "query": {
    //             "bool": {
    //                 "must": [
    //                     {
    //                         "prefix": {
    //                             "service.name": "dmp.facesearch.v2"
    //                         }
    //                     },
    //                     {
    //                         "prefix": {
    //                             "request.uri": "/dmp/facesearch/v2/search"
    //                         }
    //                     },
    //                     {
    //                         "range": {
    //                             "@timestamp": {
    //                                 "gte": 1590992000000,
    //                                 "lt": 1597027697134
    //                             }
    //                         }
    //                     },
    //                     {
    //                         "term": {
    //                             "consumer.username": "quanglh4@vpbank.com.vn"
    //                         }
    //                     }
    //
    //                 ]
    //             }
    //         }
    //     }
    // }, (err, result) => {
    //     result.hits.hits.forEach(function (hit) {
    //         allRecords.push(hit);
    //     });
    //
    //     if (result.hits.total !== allRecords.length) {
    //         // now we can call scroll over and over
    //         client.scroll({
    //             scrollId: result._scroll_id,
    //             scroll: '30s'
    //         }, getMoreUntilDone);
    //     } else {
    //         console.log('all done', allRecords);
    //     }
    // })
});

// router.get('/:id', function (req, res, next) {

// });

module.exports = router;