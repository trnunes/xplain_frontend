relations = [
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
  
  