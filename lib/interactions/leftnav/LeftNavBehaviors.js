var LeftNavBehaviors = {
  PARALLAX_FADE: {
    side: {
      translate: function(sideWidth, scrollLeft) {
        return {
          x: sideWidth - .75 * scrollLeft
        };
      },
      rotate: function() {
        return null;
      },
      opacity: function(sideWidth, scrollLeft) {
        return .75 + .75 * (1 - scrollLeft / sideWidth);
      }
    },
    top: {
      translate: function(sideWidth, scrollLeft) {
        return {x: sideWidth - scrollLeft};
      },
      rotate: function() {
        return null;
      },
      opacity: function() {
        return null;
      }
    },
    content: {
      translate: function(sideWidth, scrollLeft) {
        return {x: sideWidth - scrollLeft};
      },
      rotate: function() {
        return null;
      },
      opacity: function() {
        return null;
      }
    }
  }
};

module.exports = LeftNavBehaviors;