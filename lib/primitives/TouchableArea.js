/** @jsx React.DOM */

var React = require('react');

var TouchEventUtils = require('../thirdparty/TouchEventUtils');


var TouchableArea = React.createClass({displayName: 'TouchableArea',
  getDefaultProps: function() {
    return {
      component: React.DOM.div,
      touchable: true
    };
  },

  handleTouchStart: function(e) {
    var singleTouch = TouchEventUtils.extractSingleTouch(e);
    if(singleTouch.target.href){
      return;
    }
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchStart(e.touches, e.timeStamp);
    e.preventDefault();
  },

  handleTouchMove: function(e) {
    var singleTouch = TouchEventUtils.extractSingleTouch(e);
    if(singleTouch.target.href){
      return;
    }

    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    e.preventDefault();
  },

  handleTouchEnd: function(e) {
    var singleTouch = TouchEventUtils.extractSingleTouch(e);
    if(singleTouch.target.href){
      return;
    }

    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchEnd(e.timeStamp);
    e.preventDefault();
  },

  render: function() {
    var component = this.props.component;
    return this.transferPropsTo(
      component(
        {onTouchStart:this.handleTouchStart,
        onTouchMove:this.handleTouchMove,
        onTouchEnd:this.handleTouchEnd,
        onTouchCancel:this.handleTouchEnd}, 
        this.props.children
      )
    );
  }
});

module.exports = TouchableArea;