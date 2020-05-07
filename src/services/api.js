import rp from 'request-promise';
import helpers from './sparql/helpers';
import ResourceQuery from './sparql/ResourceQuery';
import ResourceHelper from './sparql/ResourceHelper';

import cloneDeep from 'lodash/cloneDeep';
import uuid from 'uuid/v1';

const {getStaticEndpointParameters, getHTTPQuery, getHTTPGetURL} = helpers;

const outputFormat = 'application/sparql-results+json';
const headers = {'Accept': 'application/sparql-results+json'};

let relations = [
  {
    id: 'cite',
    text: 'cite',
    node: 'cite',
    type: 'Xplain::SchemaRelation',
  },

  {
    id: 'cited_by',
    text: 'cited_by',
    node: 'cited_by',
    type: 'Xplain::SchemaRelation',
  },
  {
    id: 'author',
    text: 'author',
    node: 'author',
    type: 'Xplain::SchemaRelation',
  },  
  {
    id: 'publishingYear',
    text: 'publishingYear',
    node: 'publishingYear',
    type: 'Xplain::SchemaRelation',
  },

];

let endpoints = [
  {    
    url: 'http://opencitations.org/sparql',
    title: 'Opencitations',
    resultsLimit: 10000,
    graph: 'http://opencitations.org/graph',
    itemsLimit: 5000,
    id: 'http://opencitations.org/sparqlhttp://opencitations.org/graph'
  },
  {
    
    url: 'http://dbpedia.org/sparql',
    title: 'DBpedia',
    graph: 'http://dbpedia.org/graph',
    resultsLimit: 10000,
    itemsLimit: 5000,
    id: 'http://dbpedia.org/sparqlhttp://dbpedia.org/graph'
       
  },
  {
    
    url: 'http://claimskg.org/sparql',
    title: 'ClaimsKG',
    graph: 'http://claimskg.org/graph',
    resultsLimit: 10000,
    itemsLimit: 5000,
    id: 'http://claimskg.org/sparqlhttp://claimskg.org/graph'
       
  },
  {
    
    url: 'http://pt.dbpedia.org/sparql',
    title: 'DBpedia Português',
    graph: 'http://pt.dbpedia.org/graph',
    resultsLimit: 10000,
    itemsLimit: 5000,
    id: 'http://pt.dbpedia.org/sparqlhttp://pt.dbpedia.org/graph'
  },
];

//Generate endpoints' ids



let sessions = [
  {
    id: 'session1',
    url: 'http://xplain.tecweb.com.br/session1',
    title: 'Analisar co-citações de artigos',
    count: 4,
    endpoints: ['http://dbpedia.org/sparql', 'http://claimskg.org/sparql'],
    sets: ["set1", "set2", "set3", "set4"]
  },
  {
    id: 'session2',
    url: 'http://xplain.tecweb.com.br/session2',
    title: 'Analisar grau de relevância de artigos',
    count: 3,
    endpoints: ['http://dbpedia.org/sparql', 'http://claimskg.org/sparql'],
    sets: ["set1", "set2", "set3"]
  },
  {
    id: 'session3',
    url: 'http://xplain.tecweb.com.br/session3',
    title: 'Montar um roteiro de viagem',
    count: 2,
    endpoints: ['http://dbpedia.org/sparql', 'http://claimskg.org/sparql'],
    sets: ["set1", "set2"]
  },
  {
    id: 'session4',
    url: 'http://xplain.tecweb.com.br/session4',
    title: 'Analisar tratamentos alternativos para diabetes',
    count: 1,
    endpoints: ['http://dbpedia.org/sparql', 'http://claimskg.org/sparql'],
    sets: ["set1"]
  },
  
];

let data = {
  'set1': {
    id: 'set1',
    text: 'Set 1',
    total: 10,
    node: 'set1',
    type: 'Xplain::ResultSet',
    children: [
      {
        id: 'set1_1',
        text: 'Semantic Web article',
        node: 'set1_1',
        set: 'set1',
        type: 'Xplain::Entity',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set1_1.1',
            text: 'Linked data',
            node: 'set1_1.1',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
          {
            id: 'set1_1.2',
            text: 'Web data browsers',
            node: 'set1_1.2',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
      {
        id: 'set1_2',
        text: 'Big data',
        node: 'set1_2',
        set: 'set1',
        type: 'Xplain::SchemaRelation',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set1_2.1',
            text: 'Cloud computing',
            node: 'set1_2.1',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
          {
            id: 'set1_2.2',
            text: 'NoSQL Databases',
            node: 'set1_2.2',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
      {
        id: 'set1_3',
        text: 'Machine Learning',
        node: 'set1_3',
        set: 'set1',
        type: 'Xplain::Literal',
        intention: 'This is the expression that generated this set',
        children: []
      },
      {
        id: 'set1_4',
        text: 'Natural Language Processing',
        node: 'set1_4',
        set: 'set1',
        type: 'Xplain::Entity',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set1_4.1',
            text: 'Entity Recognition',
            node: 'set1_4.1',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
          {
            id: 'set1_4.2',
            text: 'Correference Analysis',
            node: 'set1_4.2',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
    ]
  },

  'set2': {
    id: 'set2',
    text: 'Set 2',
    type: "Xplain::ResultSet",
    node: "set2",
    total: 10,
    children: [
      {
        id: 'set2_1',
        text: 'Semantic Web article',
        node: 'set2_1',
        set: 'set1',
        type: 'Xplain::Entity',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set2_1.1',
            text: 'Linked data',
            node: 'set2_1.1',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
          {
            id: 'set2_1.2',
            text: 'Web data browsers',
            node: 'set2_1.2',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
      {
        id: 'set2_2',
        text: 'Big data',
        node: 'set2_2',
        set: 'set1',
        type: 'Xplain::SchemaRelation',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set2_2.1',
            text: 'Cloud computing',
            node: 'set2_2.1',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
          {
            id: 'set2_2.2',
            text: 'NoSQL Databases',
            node: 'set2_2.2',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
      {
        id: 'set2_3',
        text: 'Machine Learning',
        node: 'set2_3',
        set: 'set1',
        type: 'Xplain::Literal',
        intention: 'This is the expression that generated this set',
        children: []
      },
      {
        id: 'set2_4',
        text: 'Natural Language Processing',
        node: 'set2_4',
        set: 'set1',
        type: 'Xplain::Entity',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set2_4.1',
            text: 'Entity Recognition',
            node: 'set2_4.1',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: [
              {
                id: 'set2_4.1.1.',
                text: 'Entity Recognition',
                node: 'set2_4.1.1',
                set: 'set1',
                type: 'Xplain::Entity',
                intention: 'This is the expression that generated this set',
                children: []
              }
            ]
          },
          {
            id: 'set2_4.2',
            text: 'Correference Analysis',
            node: 'set2_4.2',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
    ]
  },
  'set3': {
    id: 'set3',
    text: 'Set 3',
    total: 10,
    node: 'set3',
    type: 'Xplain::ResultSet',
    children: [
      {
        id: 'set3_1',
        text: 'Semantic Web article',
        node: 'set3_1',
        set: 'set3',
        type: 'Xplain::Entity',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set3_1.1',
            text: 'Linked data',
            node: 'set3_1.1',
            set: 'set3',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
          {
            id: 'set3_1.2',
            text: 'Web data browsers',
            node: 'set3_1.2',
            set: 'set3',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
      {
        id: 'set3_2',
        text: 'Big data',
        node: 'set3_2',
        set: 'set3',
        type: 'Xplain::SchemaRelation',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set3_2.1',
            text: 'Cloud computing',
            node: 'set3_2.1',
            set: 'set3',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
          {
            id: 'set3_2.2',
            text: 'NoSQL Databases',
            node: 'set3_2.2',
            set: 'set3',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
      {
        id: 'set3_3',
        text: 'Machine Learning',
        node: 'set3_3',
        set: 'set3',
        type: 'Xplain::Literal',
        intention: 'This is the expression that generated this set',
        children: []
      },
      {
        id: 'set3_4',
        text: 'Natural Language Processing',
        node: 'set3_4',
        set: 'set3',
        type: 'Xplain::Entity',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set3_4.1',
            text: 'Entity Recognition',
            node: 'set3_4.1',
            set: 'set3',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
          {
            id: 'set3_4.2',
            text: 'Correference Analysis',
            node: 'set3_4.2',
            set: 'set3',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
    ]
  },

  'set4': {
    id: 'set4',
    text: 'Set 4',
    type: "Xplain::ResultSet",
    node: "set4",
    total: 10,
    children: [
      {
        id: 'set4_1',
        text: 'Semantic Web article',
        node: 'set4_1',
        set: 'set1',
        type: 'Xplain::Entity',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set4_1.1',
            text: 'Linked data',
            node: 'set4_1.1',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
          {
            id: 'set4_1.2',
            text: 'Web data browsers',
            node: 'set4_1.2',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
      {
        id: 'set4_2',
        text: 'Big data',
        node: 'set4_2',
        set: 'set1',
        type: 'Xplain::SchemaRelation',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set4_2.1',
            text: 'Cloud computing',
            node: 'set4_2.1',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
          {
            id: 'set4_2.2',
            text: 'NoSQL Databases',
            node: 'set4_2.2',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
      {
        id: 'set4_3',
        text: 'Machine Learning',
        node: 'set4_3',
        set: 'set1',
        type: 'Xplain::Literal',
        intention: 'This is the expression that generated this set',
        children: []
      },
      {
        id: 'set4_4',
        text: 'Natural Language Processing',
        node: 'set4_4',
        set: 'set1',
        type: 'Xplain::Entity',
        intention: 'This is the expression that generated this set',
        children: [
          {
            id: 'set4_4.1',
            text: 'Entity Recognition',
            node: 'set4_4.1',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: [
              {
                id: 'set4_4.1.1.',
                text: 'Entity Recognition',
                node: 'set4_4.1.1',
                set: 'set1',
                type: 'Xplain::Entity',
                intention: 'This is the expression that generated this set',
                children: []
              }
            ]
          },
          {
            id: 'set4_4.2',
            text: 'Correference Analysis',
            node: 'set4_4.2',
            set: 'set1',
            type: 'Xplain::Entity',
            intention: 'This is the expression that generated this set',
            children: []
          },
        ],
      },
    ]
  }

};


export function loadChildren(setId, nodeId){
  console.log(setId, nodeId);
  
  if (setId === nodeId){
    debugger;
    return data[setId].children
  }
  function search(item){
    // console.log(item.id, nodeId)
    if (item.node === nodeId) {
      return item;
    }
    let result = null
    item.children.every(child => {
      result = search(child);
      return !result
    });
    
    return result;
  }
  let result = null;
  data[setId].children.every(child => {
    result = search(child);
    return !result;
  });

  if (result){
    return result.children;
  }
  return [];
};

export function loadSet(setId){
  return data[setId];  
};

export function loadSets() {

};

export async function fetchChildren(nodeObj) {
  // return loadChildren(nodeObj.node.split("_")[0], nodeObj.node);
  // nodeObj.id = "http://dbpedia.org/resource/Berlin";
  const resourceQuery = new ResourceQuery();
  const resourceHelper = new ResourceHelper();
  let endpointParameters = getStaticEndpointParameters();

  let query = resourceQuery.getPrefixes() + resourceQuery.getRelations(endpointParameters.graphName, nodeObj.id);
  // let endpointParameters = sparqlEndpoint['generic'];
  
  
  let user = {accountName: 'open'};
  console.log(endpointParameters);
  console.log(query)
  let children = [];
  let res = await rp.get({uri: getHTTPGetURL(getHTTPQuery('read', query, endpointParameters, outputFormat)), headers: headers});
      
  //exceptional case for user properties: we hide some admin props from normal users
  console.log(res);
  let rpIndex = resourceHelper.parseProperties(res, "", nodeObj.id);
  
  children = Object.keys(rpIndex.propIndex).map(propKey=>{
    
    let relationObject = {
      id: propKey, 
      node: uuid(),
      fetched: true,
      text: propKey, 
      children: rpIndex.propIndex[propKey].map(value=>{
        return (({ value, valueLabel }) => ({ id: value, value, valueLabel, text: value, node: uuid(), fetched: false, type:'Xplain::Entity', children:[] }))(value);          
      })
    }
    return relationObject;
  });

  nodeObj.children = children;
  
  return nodeObj.children;
}

export function filterSetByKeyword(setId, keyword) {
  let copiedSet = cloneDeep(loadSet(setId));
  
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
        return (({ uri, label }) => ({ id: uri, text: label, fetched: false, node: `${copiedSet.id}_${uuid()}`, type:'Xplain::Entity', children:[] }))(value);          
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