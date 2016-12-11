var windowComponent = IgeClass.extend({
  classId: 'windowComponent',
  componentId: 'window',

  selectedType: 'view',
  optionsVisible: false,

  types: {
    view: {
      cell: 1,
      name: 'Great view',
    },
    horse: {
      cell: 2,
      name: 'Horse curtains',
    },
    tv: {
      cell: 3,
      name: 'Television',
    }
  },

  init: function (entity, options) {
    var self = this;

    this._entity = entity;

    self.texture = new IgeCellSheet('graphics/window.png', 1, 3);

    self._entity.id('window')
    .depth(1)
    .isometric(true)
    .texture(self.texture)
    .cell(1)
    .anchor(100, 20)
    .bounds2d(231, 219);

    self._entity.changeButton = new IgeFontEntity()
    .backgroundColor('rgba(0,0,0,0.3)')
    .top(30)
    .left(170)
    .width(150)
    .height(50)
    .textAlignX(1)
    .textAlignY(1)
    .colorOverlay('#ffffff')
    .nativeFont('13px Arial')
    .nativeStroke(3)
    .nativeStrokeColor('#666')
    .text('CHANGE')
    .mouseUp(function() {
      var opacity;
      if(self.optionsVisible) {
        opacity = 0;
      } else {
        opacity = 1;
      }
      self.optionsVisible = !self.optionsVisible;
      Object.keys(self.types).forEach(function(key) {
        self._entity['changeButton-'+key].opacity(opacity);
        self._entity['changeButtonTooltip-'+key].opacity(0);
      });
    })
    .mouseOver(function() {
      entity.changeButton.backgroundColor('rgba(0,0,0,0.6)');
    })
    .mouseOut(function() {
      entity.changeButton.backgroundColor('rgba(0,0,0,0.3)');
    })
    .mount(self._entity);

    var i = 0;

    Object.keys(self.types).forEach(function(key) {

      self._entity['changeButton-'+key] = new IgeUiElement()
      .backgroundColor('rgba(0,0,0,0.3)')
      .opacity(0)
      .bottom(40)
      .left(170+i*70)
      .width(60)
      .height(60)
      .data('value', key)
      .mount(self._entity)
      .mouseOver(function() {
        self._entity['changeButtonTooltip-'+this.data('value')]
        .opacity(1)
        .text(self.types[this.data('value')].name);
      })
      .mouseOut(function() {
        self._entity['changeButtonTooltip-'+this.data('value')].opacity(0);
      })
      .mouseUp(function() {
        self.changeType(this.data('value'));
      });

      self._entity['changeButtonImage-'+key] = new IgeEntity()
      .texture(self.texture)
      .cell(self.types[key].cell)
      .translateTo(0, 0, 0)
      .width(40)
      .height(30)
      .mount(self._entity['changeButton-'+key]);

      self._entity['changeButtonTooltip-'+key] = new IgeFontEntity()
      .backgroundColor('rgba(0,0,0,0.6)')
      .top(80)
      .left(0)
      .width(150)
      .height(50)
      .textAlignX(1)
      .textAlignY(1)
      .colorOverlay('#ffffff')
      .nativeFont('12px Arial')
      .text(self.types[key].name)
      .mount(self._entity['changeButton-'+key]);

      i++;

    });

    self._entity['changeButton-'+self.selectedType].backgroundColor('rgba(0,0,0,0.6)');

  },

  changeType: function(value) {

    var self = this;

    self._entity.cell(self.types[value].cell);

    self.selectedType = value;

    Object.keys(self.types).forEach(function(key) {

      if(i==self.types[value].cell) {
        self._entity['changeButton-'+key].backgroundColor('rgba(0,0,0,0.6)');
      } else {
        self._entity['changeButton-'+key].backgroundColor('rgba(0,0,0,0.3)');
      }

    });

  }

});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = windowComponent; }