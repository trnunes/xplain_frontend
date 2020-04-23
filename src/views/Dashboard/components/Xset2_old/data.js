import uuid from 'uuid/v1';
import moment from 'moment';

export default [
  {
    id: '1',
    text: 'This is an exploration item mock for the new xplain interface! ',
    node: '1',
    set: 'set_1',
    type: 'Xplain::Entity',
    intention: 'This is the expression that generated this set',
    children: []
  },
  {
    id: '2',
    text: 'This is an exploration item mock for the new xplain interface! ',
    node: '2',
    set: 'set_1',
    type: 'Xplain::SchemaRelation',
    intention: 'This is the expression that generated this set',
    children: [
      {
        id: '2.1',
        text: 'This is an exploration item mock for the new xplain interface! ',
        node: '2.1',
        set: 'set_1',
        type: 'Xplain::Entity',
        intention: 'This is the expression that generated this set',
        children: []
      },
      {
        id: '2.2',
        text: 'This is an exploration item mock for the new xplain interface! ',
        node: '2.2',
        set: 'set_1',
        type: 'Xplain::Entity',
        intention: 'This is the expression that generated this set',
        children: []
      },
    ],
  },
  {
    id: '3',
    text: 'This is an exploration item mock for the new xplain interface! ',
    node: '3',
    set: 'set_1',
    type: 'Xplain::Literal',
    intention: 'This is the expression that generated this set',
    children: []
  },
  {
    id: '4',
    text: 'This is an exploration item mock for the new xplain interface! ',
    node: '4',
    set: 'set_1',
    type: 'Xplain::Entity',
    intention: 'This is the expression that generated this set',
    children: []
  },
];
