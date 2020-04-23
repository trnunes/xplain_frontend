import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tree, SampleTree } from 'react-lazy-paginated-tree';

class ReactLazyPaginatedTree extends Component {

  render() {
    return <Tree nodes={SampleTree} useLocalState={true} />;
  }
}