import rp from 'request-promise';
import helpers from './sparql/helpers';
import ResourceQuery from './sparql/ResourceQuery';
import ResourceHelper from './sparql/ResourceHelper';

import cloneDeep from 'lodash/cloneDeep';
import uuid from 'uuid/v1';

const {getStaticEndpointParameters, getHTTPQuery, getHTTPGetURL} = helpers;

const outputFormat = 'application/sparql-results+json';
const headers = {'Accept': 'application/sparql-results+json'};


export function loadChildren(setId, nodeObj){

};

export function loadSet(setId){
  return cloneDeep(data[setId]);  
};

export function loadSets() {

};

export function fetchChildren(nodeId) {
  return loadChildren(nodeId.split("_")[0], nodeId);
}

export function filterSetByKeyword(setId, keyword) {
  let copiedSet = loadSet(setId);
  
  const match = (item, keyword) => {
    return (item.id.toLowerCase().indexOf(keyword.toLowerCase()) >=0 || item.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0);
  }

  function filterTree(item){
    debugger;

    if (match(item, keyword)) {
      return item;  
    }

    let childrenToRemove = [];

    item.children.forEach(child => {
      const itemFound = filterTree(child);
      if (!itemFound) {
        childrenToRemove.push(child);
      }      
    });

    const hasAtLeastOneChildren = childrenToRemove.length !== item.children.length;
    
    childrenToRemove.forEach(child=>{
      const childIndex = item.children.indexOf(child);
      if (childIndex >= 0){
        item.children.splice(childIndex, 1);
      }
    });

    if (hasAtLeastOneChildren){
      return item;  
    }

    return null;
  }

  filterTree(copiedSet);

  return copiedSet
}

export function listSessions() {
  return sessions;
}

export function addEndpoint(data) {
  const {url, graph, title, itemsLimit, resultsLimit, useInvertedIndex} = data;
  let fetchedEndpoint = endpoints.filter(item=>item.id === url.concat(graph));
  debugger;
  if (fetchedEndpoint.length) {
    endpoints.splice(endpoints.indexOf(fetchedEndpoint[0]), 1);
  }

  endpoints.push(data);

  return url.concat(graph);
}

export function listEndpoints() {
  return endpoints;
}

export function loadSession(sessionId) {
  const session  = sessions.filter(s=>s.id === sessionId)[0];
  let sessionCopy = cloneDeep(session);
  sessionCopy.sets = sessionCopy.sets.map(setId=>loadSet(setId));
  debugger;
  return sessionCopy;
}

export function listRelations(setId=null) {
  return relations;
}

export function fetchNestedRelations(setId, path = []) {
  
  let relationsCopy = cloneDeep(relations).map(r=>{r.node=uuid();return r});
  debugger;
  return relationsCopy
};

export function loadImage(setId, relationPath, sampleAmount = 0) {
  console.log("LOADING IMAGE FOR: ", relationPath);
  if (!relationPath || !relationPath.length) { return [];}
  return [
    { text: 'The Shawshank Redemption', year: 1994 },
    { text: 'The Godfather', year: 1972 },
    { text: 'The Godfather: Part II', year: 1974 },
    { text: 'The Dark Knight', year: 2008 },
    { text: '12 Angry Men', year: 1957 },
    { text: "Schindler's List", year: 1993 },
    { text: 'Pulp Fiction', year: 1994 },
    { text: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { text: 'The Good, the Bad and the Ugly', year: 1966 },
    { text: 'Fight Club', year: 1999 },
    { text: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { text: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { text: 'Forrest Gump', year: 1994 },
    { text: 'Inception', year: 2010 },
    { text: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { text: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { text: 'Goodfellas', year: 1990 },
    { text: 'The Matrix', year: 1999 },
    { text: 'Seven Samurai', year: 1954 },
    { text: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { text: 'City of God', year: 2002 },
    { text: 'Se7en', year: 1995 },
    { text: 'The Silence of the Lambs', year: 1991 },
    { text: "It's a Wonderful Life", year: 1946 },
    { text: 'Life Is Beautiful', year: 1997 },
    { text: 'The Usual Suspects', year: 1995 },
    { text: 'Léon: The Professional', year: 1994 },
    { text: 'Spirited Away', year: 2001 },
    { text: 'Saving Private Ryan', year: 1998 },
    { text: 'Once Upon a Time in the West', year: 1968 },
    { text: 'American History X', year: 1998 },
    { text: 'Interstellar', year: 2014 },
  ];
};

export function loadPreview(operation) {
  return [
      { text: 'The Shawshank Redemption', year: 1994 },
      { text: 'The Godfather', year: 1972 },
      { text: 'The Godfather: Part II', year: 1974 },
      { text: 'The Dark Knight', year: 2008 },
      { text: '12 Angry Men', year: 1957 },
      { text: "Schindler's List", year: 1993 },
      { text: 'Pulp Fiction', year: 1994 },
      { text: 'The Lord of the Rings: The Return of the King', year: 2003 },
      { text: 'The Good, the Bad and the Ugly', year: 1966 },
      { text: 'Fight Club', year: 1999 },
      { text: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
      { text: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
      { text: 'Forrest Gump', year: 1994 },
      { text: 'Inception', year: 2010 },
      { text: 'The Lord of the Rings: The Two Towers', year: 2002 },
      { text: "One Flew Over the Cuckoo's Nest", year: 1975 },
      { text: 'Goodfellas', year: 1990 },
      { text: 'The Matrix', year: 1999 },
      { text: 'Seven Samurai', year: 1954 },
      { text: 'Star Wars: Episode IV - A New Hope', year: 1977 },
      { text: 'City of God', year: 2002 },
      { text: 'Se7en', year: 1995 },
      { text: 'The Silence of the Lambs', year: 1991 },
      { text: "It's a Wonderful Life", year: 1946 },
      { text: 'Life Is Beautiful', year: 1997 },
      { text: 'The Usual Suspects', year: 1995 },
      { text: 'Léon: The Professional', year: 1994 },
      { text: 'Spirited Away', year: 2001 },
      { text: 'Saving Private Ryan', year: 1998 },
      { text: 'Once Upon a Time in the West', year: 1968 },
      { text: 'American History X', year: 1998 },
      { text: 'Interstellar', year: 2014 },
  ];
};

export function addSetTo(set, sessionId) {
  return new Promise((resolve, reject)=>{
    data[set.id] = set;
    let sessionList = sessions.filter(s=>s.id === sessionId);
    if (sessionList.length) {
      let sets = sessionList[0].sets;
      let index = sets.findIndex(s=> s === set.id);
      if (index >= 0) {
        sets.splice(index, 1, set.id);        
      } else {
        sets.push(set.id);
      }      
    }
    resolve(set.id);
  });
};

export function sessionSave(title, sets, endpoints) {
  
  const promise = new Promise( (resolve, reject) =>{
    if (!sets.length){ reject("Cannot save an empty session!")}
    if (!title) { reject("Cannot save an untitled session. Please, inform a valid title!")}

    const id = title.replace(" ", "_");
  
    let sessionObj = {
      id: id,
      title: title,
      url: `http://xplain.tecweb.com.br/${id}`,
      count: sets.length,
      sets: sets.map(s=>s.id),
      endpoints: endpoints
    }
  
    const index = sessions.findIndex(s=>s.id===id);
    if(index){
      sessions.splice(index, 1, sessionObj);
      resolve(id);
    } else {
      sessions.push(sessionObj);
      resolve(id);
    }
  });
  return promise;
}

export async function query(queryStr="", endpoint=[], callback){
  const resourceQuery = new ResourceQuery();
  const resourceHelper = new ResourceHelper();
  let endpointParameters = getStaticEndpointParameters();
  let query = resourceQuery.getPrefixes() + resourceQuery.getRelations(endpointParameters.graphName, "http://dbpedia.org/resource/Brazil");
  // let endpointParameters = sparqlEndpoint['generic'];
  
  
  let user = {accountName: 'open'};
  console.log(endpointParameters);
  console.log(query)
  let copiedSet = cloneDeep(data['set1']);
  copiedSet.id = uuid();
  copiedSet.node = uuid();
  copiedSet.text = copiedSet.id;
  
  data[copiedSet.id] = copiedSet;
  let children = [];
  await rp.get({uri: getHTTPGetURL(getHTTPQuery('read', query, endpointParameters, outputFormat)), headers: headers}).then(function(res){
      
      //exceptional case for user properties: we hide some admin props from normal users
      console.log(res);
      let rpIndex = resourceHelper.parseProperties(res, "", "http://dbpedia.org/resource/Brazil");
      
      children = Object.keys(rpIndex.propIndex).map(propKey=>{
        
        let relationObject = {
          id: propKey, 
          node: `${copiedSet.id}_${uuid()}`,
          text: propKey, 
          children: rpIndex.propIndex[propKey].map(value=>{
            return (({ value, valueLabel }) => ({ id: value, value, valueLabel, text: value, node: `${copiedSet.id}_${uuid()}`, type:'Xplain::Entity', children:[] }))(value);          
          })
        }
        return relationObject;
      });

      
      console.log(rpIndex);

  }).catch(function (err) {
      console.log(err);
  });
  debugger;
  copiedSet.children = children;
  callback(copiedSet);
}

// Exploration Operations
export function pivot(setId, relationPath, filterDuplicates, keepSourceItems, endpoints) {
  console.log("PIVOT OVER ENDPOINTS: ", endpoints);
  return new Promise(resolve => {
    setTimeout(() => {
      let copiedSet = cloneDeep(data['set1']);
      copiedSet.id = uuid();
      copiedSet.node = uuid();
      copiedSet.text = copiedSet.id;
      data[copiedSet.id] = copiedSet;
      debugger;
      resolve(
        copiedSet
      );
    }, 10);
  });
};

export async function keywordSearch(keyword, endpoints) {
  let endpointParameters = getStaticEndpointParameters();
  
  let user = {accountName: 'open'};
  console.log(endpointParameters);
  let copiedSet = cloneDeep(data['set1']);
  copiedSet.id = uuid();
  copiedSet.node = uuid();
  copiedSet.text = copiedSet.id;
  
  data[copiedSet.id] = copiedSet;
  let children = [];
  let query = 'http://lookup.dbpedia.org/api/search/KeywordSearch?QueryString=' + keyword;
  console.log("Query: ", query)
  const headers = {'Accept': 'application/json'}
  await rp.get({uri: query, headers: headers}).then(function(res){
      const resultObj = JSON.parse(res);
      children = resultObj.results.map(value=>{
        return (({ uri, label }) => ({ id: uri, text: label, node: `${copiedSet.id}_${uuid()}`, type:'Xplain::Entity', children:[] }))(value);          
      });
    
      //exceptional case for user properties: we hide some admin props from normal users
      console.log("Results: ", res);
      
  }).catch(function (err) {
      console.log(err);
  });
  debugger;
  copiedSet.children = children;
  return copiedSet;

}