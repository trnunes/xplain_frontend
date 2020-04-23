import uuid from 'uuid/v1';

export default [
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
