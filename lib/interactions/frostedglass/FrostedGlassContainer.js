/** @jsx React.DOM */

var React = require('react');

var FrostedGlassViewport = require('./helpers/FrostedGlassViewport');
var StyleKeys = require('../../environment/StyleKeys');

function shallowCopy(x) {
  var y = {};
  for (var z in x) {
    if (!x.hasOwnProperty(z)) {
      continue;
    }
    y[z] = x[z];
  }
  return y;
}

function cloneChildren(children) {
  if (React.isValidComponent(children)) {
    return cloneComponent(children);
  } else if (Array.isArray(children)) {
    return children.map(cloneComponent);
  } else if (!children) {
    return null;
  } else {
    var r = {};
    for (var k in children) {
      if (!children.hasOwnProperty(k)) {
        continue;
      }
      r[k] = cloneComponent(children[k]);
    }
    return r;
  }
}

function cloneComponent(component) {
  if (!React.isValidComponent(component)) {
    // string or something
    return component;
  }
  var newInstance = new component.constructor();
  var newChildren = cloneChildren(component.props.children);
  var newProps = shallowCopy(component.props);
  delete newProps.children;
  newInstance.construct(newProps, newChildren);
  return newInstance;
}

var GlassContainer = React.createClass({displayName: 'GlassContainer',
  getDefaultProps: function() {
    return {style: {}, overlays: {}};
  },

  render: function() {
    var viewports = [
      FrostedGlassViewport(
        {key:"content",
        glassContent:this.props.children,
        left:this.props.content.left,
        top:this.props.content.top,
        width:this.props.content.width,
        height:this.props.content.height,
        style:this.props.content.style,
        scroller:this.props.scroller}
      )
    ];

    for (var key in this.props.overlays) {
      var overlay = this.props.overlays[key];

      // TODO: this is somewhat of an anti-pattern: cloneChildren() should create the
      // children with the correct props. But I'm too lazy to build the correct deep
      // merger. And this isn't that bad since this component owns the props anyway.
      var clonedChildren = cloneChildren(this.props.children);

      clonedChildren.props = shallowCopy(clonedChildren.props);
      clonedChildren.props.style = shallowCopy(clonedChildren.props.style || {});
      clonedChildren.props.style[StyleKeys.FILTER] = 'blur(5px)';

      viewports.push(
        FrostedGlassViewport(
          {key:key,
          glassContent:clonedChildren,
          left:overlay.left,
          top:overlay.top,
          width:overlay.width,
          height:overlay.height,
          style:overlay.style}, 
          overlay.children
        )
      );
    }

    var newProps = shallowCopy(this.props);
    newProps.style = newProps.style || {};
    newProps.style.position = newProps.style.position || 'relative';
    newProps.style.overflow = 'hidden';

    return React.DOM.div(newProps, viewports);
  }
});

module.exports = GlassContainer;