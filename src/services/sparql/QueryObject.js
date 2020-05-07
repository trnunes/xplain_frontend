
class QueryObject{
    constructor(){
        this.prefixes = `
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX ldr: <https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX dcterms: <http://purl.org/dc/terms/>
            PREFIX void: <http://rdfs.org/ns/void#>
            PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
            PREFIX DBpedia: <http://dbpedia.org/ontology/>
            PREFIX Schema: <http://schema.org/>
        `;

        this.query = '';
    }

    getPrefixes() {
        return this.prefixes;
    }

    prepareGraphName(graphName){
        let gStart = 'GRAPH <'+ graphName +'> { ';
        let gEnd = ' } ';
        if(!graphName || graphName === 'default'){
            gStart =' ';
            gEnd = ' ';
        }
        return {gStart: gStart, gEnd: gEnd}
    }

    //Generates new URI for the dataset and the prefix
    createDynamicURI(datasetURI, prefix){
        let newResourceURI = datasetURI + '/' + prefix + Math.round(+new Date() / 1000);
        //do not add two slashes
        if(datasetURI.slice(-1) === '/'){
            newResourceURI = datasetURI + prefix + Math.round(+new Date() / 1000);
        }
        return newResourceURI;
    }

    getProperties(endpointParameters, graphName, resourceURI) {
        let {gStart, gEnd} = this.prepareGraphName(graphName);
        this.query = `
            SELECT ?p ?o (count(DISTINCT ?extendedVal) AS ?hasExtendedValue) (SAMPLE(?olb) AS ?oLabel) (SAMPLE(?otb) AS ?oTitle) WHERE {
                ${gStart}
                    <${resourceURI}> ?p ?o .
                    OPTIONAL {?o ?uri ?extendedVal .}
                    OPTIONAL {?o rdfs:label ?ol .}
                    OPTIONAL {?o dcterms:title ?ot .}
                    BIND ( IF (BOUND (?ol), ?ol, '' )  as ?olb  ) .
                    BIND ( IF (BOUND (?ot), ?ot, '' )  as ?otb  ) .
                ${gEnd}
            } GROUP BY ?p ?o
        `;
        return this.query;
    }
    

}