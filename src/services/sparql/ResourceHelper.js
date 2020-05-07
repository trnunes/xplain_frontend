'use strict';
import async from 'async';

function compareProps(a,b) {
    if (a.property < b.property)
        return -1;
    if (a.property > b.property)
        return 1;
    return 0;
}
class ResourceHelper {
    getPropertyLabel(uri) {
        var property = '';
        var tmp = uri;
        var tmp2 = tmp.split('#');
        if (tmp2.length > 1) {
            property = tmp2[1];
        } else {
            tmp2 = tmp.split('/');
            property = tmp2[tmp2.length - 1];
            tmp2 = property.split(':');
            property = tmp2[tmp2.length - 1];
        }
        //make first letter capital case
        property = property.charAt(0).toUpperCase() + property.slice(1);
        return property;
    }
    parseProperties(body, datasetURI, resourceURI) {
        let parsed = JSON.parse(body);
        if (!parsed.results || !parsed.results.bindings || !parsed.results.bindings.length || parsed.head.vars[0] === 'callret-0') {
            //no results!
            //return [];
            return( {
                props: [],
                title: '',
                resourceType: [],
                rconfig: {}
            });
        }

        return this.buildResourcePropertyIndex(parsed.results.bindings);

    }
    buildResourcePropertyIndex(bindings) {
        let propIndex = {};
        let output= {propIndex: propIndex, title: '', resourceType: []};
        bindings.forEach(function(el) {
            //see if we can find a suitable title for resource
            if (el.p.value === 'http://purl.org/dc/terms/title') {
                output.title = el.o.value;
            } else if (el.p.value === 'http://www.w3.org/2000/01/rdf-schema#label') {
                output.title = el.o.value;
            } else if (el.p.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
                output.resourceType.push(el.o.value);
            }
            //group by properties
            //I put the valueType into instances because we might have cases (e.g. subject property) in which for different instances, we have different value types
            if (propIndex[el.p.value]) {
                propIndex[el.p.value].push({
                    value: el.o.value,
                    valueType: el.o.type,
                    dataType: (el.o.type === 'typed-literal' ? el.o.datatype : ''),
                    lang: el.o['xml:lang'] ? el.o['xml:lang'] : '',
                    extended: parseInt(el.hasExtendedValue.value),
                    valueLabel: el.oLabel ? el.oLabel.value : '',
                    valueTitle: el.oTitle ? el.oTitle.value : ''
                });
            } else {
                propIndex[el.p.value] = [{
                    value: el.o.value,
                    valueType: el.o.type,
                    dataType: (el.o.type === 'typed-literal' ? el.o.datatype : ''),
                    lang: el.o['xml:lang'] ? el.o['xml:lang'] : '',
                    extended: parseInt(el.hasExtendedValue.value),
                    valueLabel: el.oLabel ? el.oLabel.value : '',
                    valueTitle: el.oTitle ? el.oTitle.value : ''
                }];
            }
            output.propIndex = propIndex;
        });
        return output;
    }
    
    buildConfigFromExtensions(extensions) {
        let config = {};
        extensions.forEach(function(el, i) {
            config[el.spec.propertyURI] = el.config;
        });
        return config;
    }
    findExtensionIndex(extensions, propertyURI) {
        let index = -1;
        extensions.forEach(function(el, i) {
            if (el.spec.propertyURI === propertyURI) {
                index = i;
            }
        });
        return index;
    }
    getExtensionConfig(extensions, propertyURI) {
        let index = this.findExtensionIndex(extensions, propertyURI);
        if (index === -1) {
            return {};
        }
        return extensions[index].config;
    }
    parseObjectProperties(user, body, datasetURI, resourceURI, propertyURI, callback) {

    }
    //------ permission check functions---------------
    deleteAdminProperties(list) {
    }
    //--------------------------------------------------------
}
export default ResourceHelper;
