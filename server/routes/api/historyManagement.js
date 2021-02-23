var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
const awsHttpClient = require('http-aws-es');
const {Client} = require('@elastic/elasticsearch')
// const fetch = require('node-fetch');

router.get('/', function (req, res, next) {
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
        body: {
            "size": 1000,
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
                                    "gte": 1590992000000,
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
    }, (err, result) => {
        if (err) console.log(err)
        console.log(result.body.hits.hits);
    })
});

// router.get('/:id', function (req, res, next) {

// });

module.exports = router;