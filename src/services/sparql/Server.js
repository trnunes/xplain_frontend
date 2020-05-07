
import rp from 'request-promise';
import helpers from './helpers';
import ResourceQuery from './ResourceQuery';
import ResourceHelper from './ResourceHelper';

const {getStaticEndpointParameters, getHTTPQuery, getHTTPGetURL} = helpers;

const outputFormat = 'application/sparql-results+json';
const headers = {'Accept': 'application/sparql-results+json'};


export default {
    do_query(){
        const resourceQuery = new ResourceQuery();
        const resourceHelper = new ResourceHelper();
        let endpointParameters = getStaticEndpointParameters();
        let query = resourceQuery.getPrefixes() + resourceQuery.getRelations(endpointParameters.graphName, "http://dbpedia.org/resource/Brazil");
        // let endpointParameters = sparqlEndpoint['generic'];
        
        
        let user = {accountName: 'open'};
        console.log(endpointParameters);
        console.log(query)
        rp.get({uri: getHTTPGetURL(getHTTPQuery('read', query, endpointParameters, outputFormat)), headers: headers}).then(function(res){
            
            //exceptional case for user properties: we hide some admin props from normal users
            console.log(res);
            let props = resourceHelper.parseProperties(res, "", "http://dbpedia.org/resource/Brazil");
            
            console.log(props);
    
        }).catch(function (err) {
            console.log(err);
        });
    }
} 
