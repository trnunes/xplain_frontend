import React, { Component } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdAddBox,
  MdIndeterminateCheckBox,
  MdFolder,
  MdFolderOpen,
  MdInsertDriveFile
} from "react-icons/md";
import cloneDeep from 'lodash/cloneDeep';
import Folder from '@material-ui/icons/Folder';
import FolderOpen from '@material-ui/icons/FolderOpen';

const nodes = [
    {
        value: '/app',
        label: 'app',
        children: [
            {
                value: '/app/Http',
                label: 'Http',
                children: [
                    {
                        value: '/app/Http/Controllers',
                        label: 'Controllers',
                        children: [{
                            value: '/app/Http/Controllers/WelcomeController.js',
                            label: 'WelcomeController.js',
                        }],
                    },
                    {
                        value: '/app/Http/routes.js',
                        label: 'routes.js',
                    },
                ],
            },
            {
                value: '/app/Providers',
                label: 'Providers',
                children: [{
                    value: '/app/Http/Providers/EventServiceProvider.js',
                    label: 'EventServiceProvider.js',
                }],
            },
        ],
    },
    {
        value: '/config',
        label: 'config',
        children: [
            {
                value: '/config/app.js',
                label: 'app.js',
            },
            {
                value: '/config/database.js',
                label: 'database.js',
            },
        ],
    },
    {
        value: '/public',
        label: 'public',
        children: [
            {
                value: '/public/assets/',
                label: 'assets',
                children: [{
                    value: '/public/assets/style.css',
                    label: 'style.css',
                }],
            },
            {
                value: '/public/index.html',
                label: 'index.html',
            },
        ],
    },
    {
        value: '/.env',
        label: '.env',
        icon: <Folder />,
    },
    {
        value: '/.gitignore',
        label: '.gitignore',
        icon: <Folder />,
    },
    {
        value: '/README.md',
        label: 'README.md',
    },
];

class WidgetTree extends Component {
    state = {
        checked: [
        ],
        expanded: [

        ],
        filterText: '',
        nodesFiltered: nodes,
        nodes,
    };

    constructor(props) {
        super(props);
        this.state.nodes = props.nodes;
        this.state.nodesFiltered = props.nodes;
        this.onCheck = this.onCheck.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.filterTree = this.filterTree.bind(this);
        this.filterNodes = this.filterNodes.bind(this);
        this.fetchChildren = props.fetchChildren;
    }

    onCheck(checked) {
        this.setState({ checked });

    }

    onExpand(expanded, targetNode) {
      
        this.setState({ expanded });
        if(!targetNode.expanded){
          return;
        }
        
        this.fetchChildren(targetNode.value)
        .then(
          result=>{            
            
            let copiedState = cloneDeep(this.state);
            let nodeToExpand = this.search(targetNode.value, copiedState.nodesFiltered);
            if (!nodeToExpand){
              throw "Cannot open this node! The node you are trying to expand was probably removed!"
            }
            nodeToExpand.children = result.children;
          
            debugger;  
            this.setState(copiedState);
            
            console.log("Children: ", result);
          }
        );
        
    }

    search(nodeId, nodes = this.state.nodesFiltered){
      var picked = nodes.find(o => o.value === nodeId);
      
      if (picked){
        return picked
      }
      let nodesToSearch = []

      nodes.forEach(node=>nodesToSearch.concat(node.children));
      return this.search(nodeId, nodesToSearch);
    }

    onFilterChange(e) {
        this.setState({ filterText: e.target.value }, this.filterTree);
    }

    filterTree() {
        // Reset nodes back to unfiltered state
        if (!this.state.filterText) {
            this.setState((prevState) => ({
                nodesFiltered: prevState.nodes,
            }));

            return;
        }

        const nodesFiltered = (prevState) => (
            { nodesFiltered: prevState.nodes.reduce(this.filterNodes, []) }
        );

        this.setState(nodesFiltered);
    }

    filterNodes(filtered, node) {
        const { filterText } = this.state;
        const children = (node.children || []).reduce(this.filterNodes, []);

        if (
            // Node's label matches the search string
            node.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 ||
            // Or a children has a matching node
            children.length
        ) {
            filtered.push({ ...node, children });
        }

        return filtered;
    }

    render() {
        const icons = {
            check: <MdCheckBox className="rct-icon rct-icon-check" />,
            uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" />,
            halfCheck: (
              <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
            ),
            expandClose: (
              <MdChevronRight className="rct-icon rct-icon-expand-close" />
            ),
            expandOpen: (
              <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />
            ),
            expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
            collapseAll: (
              <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
            ),
            parentClose: <Folder className="rct-icon rct-icon-parent-close" />,
            parentOpen: <FolderOpen className="rct-icon rct-icon-parent-open" />,
            leaf: <MdInsertDriveFile className="rct-icon rct-icon-leaf-close" />
          };
       
        const {
            checked,
            expanded,
            filterText,
            nodesFiltered,
        } = this.state;

        return (
            <div className="filter-container">
                <input
                    className="filter-text"
                    placeholder="Search..."
                    type="text"
                    value={filterText}
                    onChange={this.onFilterChange}
                />
                <CheckboxTree
                    checked={checked}
                    expanded={expanded}
                    icons={icons}
                    nodes={nodesFiltered}
                    onCheck={this.onCheck}
                    onExpand={this.onExpand}
                />
            </div>
        );
    }
}
  
export default WidgetTree;
