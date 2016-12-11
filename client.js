var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		//ige.addComponent(IgeEditorComponent);
		ige.globalSmoothing(true);

		// Load our textures
		var self = this;
		this.obj = [];

		// Create the HTML canvas
		ige.createFrontBuffer(true);

		// Start the engine
		ige.start(function (success) {
			// Check if the engine started successfully
			if (success) {
				// Create the scene
				self.mainScene = new IgeScene2d()
				.id('mainScene');

				// Create the main viewport
				self.vp1 = new IgeViewport()
				.id('vp1')
				.autoSize(true)
				.scene(self.mainScene)
				//.drawMouse(true)
				//.drawBounds(true)
				.mount(ige);

				self.textures = {};

				self.textures.backgroundTexture = new IgeTexture('graphics/background.png');
				self.textures.roomBackgroundTexture = new IgeTexture('graphics/room-background.png');
				self.textures.starTexture = new IgeTexture('graphics/star.png');

				self.bgTileMap = new IgeTextureMap()
				.id('bgTileMap')
				.isometricMounts(true)
				.tileWidth(64)
				.tileHeight(64)
				.gridSize(20, 20)
				.layer(0)
				.translateTo(0,-(64*9),0)
				.mount(self.mainScene);

				self.bgTileMap.addTexture(self.textures.backgroundTexture);

				for(x = 0; x <= 20; x++) {
					for(y = 0; y <= 20; y++) {
						self.bgTileMap.paintTile(x, y, 0, 1);
					}
				}

				self.tileMap1 = new IgeTextureMap()
				.id('tileMap1')
				.isometricMounts(true)
				.tileWidth(64)
				.tileHeight(64)
				.gridSize(7, 7)
				.drawGrid(1)
				.autoSection(4)
				.layer(2)
				.translateTo(0,-200,0)
				.mount(self.mainScene);

				self.tileMapBackground = new IgeEntity()
				.isometric(true)
				.bounds2d(930, 600)
				.anchor(9,126)
				.texture(self.textures.roomBackgroundTexture)
				.mount(self.tileMap1)
				.translateToTile(0,0,0);

				// Objects

				self.objectScene = new IgeScene2d()
				.id('objectScene')
				.layer(5)
				.mount(self.mainScene);

				self.objectTileMap = new IgeTileMap2d()
				.id('objectTileMap')
				.isometricMounts(true)
				.tileWidth(64)
				.tileHeight(64)
				.gridSize(7, 7)
				.layer(0)
				.translateTo(0,-200,0)
				.mount(self.objectScene);

				self.bed = new IgeEntity()
				.addComponent(bedComponent)
				.mount(self.objectTileMap)
				.translateToTile(4, 3, 0);

				self.table = new IgeEntity()
				.addComponent(tableComponent)
				.mount(self.objectTileMap)
				.translateToTile(6, 1, 0);

				self.bathroom = new IgeEntity()
				.addComponent(bathroomComponent)
				.mount(self.objectTileMap)
				.translateToTile(0, 5, 0);

				self.window = new IgeEntity()
				.addComponent(windowComponent)
				.mount(self.objectTileMap)
				.translateTo(2, 0, 0);

				self.customer = new Customer();

				self.customerInformationTitle = new IgeFontEntity()
				.layer(5)
		    .bottom(170)
		    .left(10)
		    .width(300)
		    .height(40)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#ffffff')
		    .nativeFont('21px Roboto')
		    .nativeStroke(3)
		    .nativeStrokeColor('#666')
		    .text('Current customer')
		    .mount(self.mainScene);

		    self.customerInformation = new IgeFontEntity()
				.layer(5)
		    .bottom(110)
		    .left(10)
		    .width(290)
		    .height(60)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#000')
		    .nativeFont('16px Roboto')
		    .autoWrap(true)
		    .text(self.customer.getDescription())
		    .mount(self.mainScene);

		    self.readyButton = new IgeFontEntity()
		    .layer(5)
		    .bottom(20)
		    .right(10)
		    .width(200)
		    .height(60)
		    .textAlignX(1)
		    .textAlignY(0)
		    .backgroundColor('rgba(0,0,0,0.3)')
		    .colorOverlay('#ffffff')
		    .nativeFont('21px Roboto')
		    .nativeStroke(3)
		    .nativeStrokeColor('#666')
		    .text('READY')
		    .mouseOver(function() {
		      this.backgroundColor('rgba(0,0,0,0.6)');
		    })
		    .mouseOut(function() {
		      this.backgroundColor('rgba(0,0,0,0.3)');
		    })
		    .mouseUp(function() {
		    	self.generateResults();
		    	self.resultsBackground.opacity(1);
		    	self.resultsWindow.opacity(1);
		    })
		    .mount(self.mainScene);

		    self.resultsBackground = new IgeUiEntity()
		    .layer(10)
		    .width(1000)
		    .height(1000)
		    .top(0)
		    .left(0)
		    .backgroundColor('rgba(0,0,0,0.7)')
		    .mount(self.mainScene);

		    self.resultsWindow = new IgeUiEntity()
		    .layer(11)
		    .width("80%")
		    .height("80%")
		    .top(40)
		    .left("10%")
		    .backgroundColor('#ffc')
		    .borderRadius(5)
		    .mount(self.mainScene);

		    self.resultsWindowTitle = new IgeFontEntity()
		    .layer(12)
		    .top(10)
		    .left(0)
		    .width("100%")
		    .height(40)
		    .textAlignX(1)
		    .textAlignY(0)
		    .colorOverlay('#ffffff')
		    .nativeFont('26px Roboto')
		    .nativeStroke(3)
		    .nativeStrokeColor('#333')
		    .text('RESULTS')
		    .mount(self.resultsWindow);

		    self.resultsWindowCustomerInformation = new IgeFontEntity()
				.layer(12)
		    .top(30)
		    .left(20)
		    .width("80%")
		    .height(120)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#000')
		    .nativeFont('16px Roboto')
		    .autoWrap(true)
		    .text(self.customer.getDescription())
		    .mount(self.resultsWindow);

		    self.resultsWindowTableTitle = new IgeFontEntity()
		    .layer(12)
		    .top(130)
		    .left(20)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('20px Roboto')
		    .text('TABLE')
		    .mount(self.resultsWindow);

		    self.resultsWindowTableItem = new IgeFontEntity()
		    .layer(12)
		    .top(130)
		    .left(300)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('16px Roboto')
		    .text(self.table.table.selectedType)
		    .mount(self.resultsWindow);

		    self.resultsWindowTableResult = new IgeFontEntity()
		    .layer(12)
		    .top(130)
		    .left(500)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('16px Roboto')
		    .text('I like it')
		    .mount(self.resultsWindow);

		    self.resultsWindowBedTitle = new IgeFontEntity()
		    .layer(12)
		    .top(170)
		    .left(20)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('20px Roboto')
		    .text('BED')
		    .mount(self.resultsWindow);

		    self.resultsWindowBedItem = new IgeFontEntity()
		    .layer(12)
		    .top(170)
		    .left(300)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('16px Roboto')
		    .text(self.bed.bed.selectedType)
		    .mount(self.resultsWindow);

		    self.resultsWindowBedResult = new IgeFontEntity()
		    .layer(12)
		    .top(170)
		    .left(500)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('16px Roboto')
		    .text('I like it')
		    .mount(self.resultsWindow);

		    self.resultsWindowBathroomTitle = new IgeFontEntity()
		    .layer(12)
		    .top(210)
		    .left(20)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('20px Roboto')
		    .text('BATHROOM')
		    .mount(self.resultsWindow);

		    self.resultsWindowBathroomItem = new IgeFontEntity()
		    .layer(12)
		    .top(210)
		    .left(300)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('16px Roboto')
		    .text(self.bathroom.bathroom.selectedType)
		    .mount(self.resultsWindow);

		    self.resultsWindowBathroomResult = new IgeFontEntity()
		    .layer(12)
		    .top(210)
		    .left(500)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('16px Roboto')
		    .text('I like it')
		    .mount(self.resultsWindow);

		    self.resultsWindowWindowTitle = new IgeFontEntity()
		    .layer(12)
		    .top(250)
		    .left(20)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('20px Roboto')
		    .text('WINDOW')
		    .mount(self.resultsWindow);

		    self.resultsWindowWindowItem = new IgeFontEntity()
		    .layer(12)
		    .top(250)
		    .left(300)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('16px Roboto')
		    .text(self.window.window.selectedType)
		    .mount(self.resultsWindow);

		    self.resultsWindowWindowResult = new IgeFontEntity()
		    .layer(12)
		    .top(250)
		    .left(500)
		    .width(120)
		    .height(20)
		    .textAlignX(0)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('16px Roboto')
		    .text('I like it')
		    .mount(self.resultsWindow);

		    self.resultsWindowYourScore = new IgeFontEntity()
		    .layer(12)
		    .bottom(140)
		    .left(0)
		    .width("100%")
		    .height(40)
		    .textAlignX(1)
		    .textAlignY(0)
		    .colorOverlay('#ffffff')
		    .nativeFont('20px Roboto')
		    .nativeStroke(3)
		    .nativeStrokeColor('#333')
		    .text('YOUR SCORE')
		    .mount(self.resultsWindow);

		    self.resultsWindowStar1 = new IgeUiEntity()
		    .texture(self.textures.starTexture)
		    .anchor(0, 0)
		    .bounds2d(40, 40)
		    .bottom(90)
		    .left(228+(45*1))
		    .mount(self.resultsWindow);

		    self.resultsWindowStar2 = new IgeUiEntity()
		    .texture(self.textures.starTexture)
		    .anchor(0, 0)
		    .bounds2d(40, 40)
		    .bottom(90)
		    .left(228+(45*2))
		    .mount(self.resultsWindow);

		    self.resultsWindowStar3 = new IgeUiEntity()
		    .texture(self.textures.starTexture)
		    .anchor(0, 0)
		    .bounds2d(40, 40)
		    .bottom(90)
		    .left(228+(45*3))
		    .mount(self.resultsWindow);

		    self.resultsWindowStar4 = new IgeUiEntity()
		    .texture(self.textures.starTexture)
		    .anchor(0, 0)
		    .bounds2d(40, 40)
		    .bottom(90)
		    .left(228+(45*4))
		    .mount(self.resultsWindow);

		    self.resultsWindowStar5 = new IgeUiEntity()
		    .texture(self.textures.starTexture)
		    .anchor(0, 0)
		    .bounds2d(40, 40)
		    .bottom(90)
		    .left(228+(45*5))
		    .mount(self.resultsWindow);

		    self.resultsWindowScore = new IgeFontEntity()
		    .layer(12)
		    .bottom(40)
		    .left(0)
		    .width("100%")
		    .height(40)
		    .textAlignX(1)
		    .textAlignY(0)
		    .colorOverlay('#333')
		    .nativeFont('24px Roboto')
		    .text('YOUR SCORE HERE')
		    .mount(self.resultsWindow);

		    self.resultsWindowNewCustomerButton = new IgeFontEntity()
		    .bottom(20)
		    .right(10)
		    .width(200)
		    .height(60)
		    .textAlignX(1)
		    .textAlignY(0)
		    .backgroundColor('rgba(0,0,0,0.3)')
		    .colorOverlay('#ffffff')
		    .nativeFont('21px Roboto')
		    .nativeStroke(3)
		    .nativeStrokeColor('#666')
		    .text('NEW CUSTOMER')
		    .mouseOver(function() {
		      this.backgroundColor('rgba(0,0,0,0.6)');
		    })
		    .mouseOut(function() {
		      this.backgroundColor('rgba(0,0,0,0.3)');
		    })
		    .mouseUp(function() {
		    	self.customer = new Customer();

		    	self.customerInformation
		    	.text(self.customer.getDescription());
		    	
		    	self.resultsBackground.opacity(0);
		    	self.resultsWindow.opacity(0);
		    })
		    .mount(self.resultsWindow);

		    self.generateResults();

			}

		});
	}, 

	generateResults: function() {

		var self = this;

		// Max score is 1000 (500 from occupation and 500 from hobbies)

		var score = 0;

		// Table score

		self.resultsWindowTableItem.text(self.table.table.types[self.table.table.selectedType].name);

		var tableScore = self.customer.getScore('table', 'occupation')+self.customer.getScore('table', 'hobby');

		if(tableScore==280) {

			self.resultsWindowTableResult
			.color('#3d3')
			.text('I love it!');

		} else if(tableScore>60) {

			self.resultsWindowTableResult
			.color('#333')
			.text('It\'s alright...');

		} else {

			self.resultsWindowTableResult
			.color('#d33')
			.text('I hate it');

		}

		// Bed score

		self.resultsWindowBedItem.text(self.bed.bed.types[self.bed.bed.selectedType].name);

		var bedScore = self.customer.getScore('bed', 'occupation')+self.customer.getScore('bed', 'hobby');

		if(bedScore==280) {

			self.resultsWindowBedResult
			.color('#3d3')
			.text('I love it!');

		} else if(bedScore>60) {

			self.resultsWindowBedResult
			.color('#333')
			.text('It\'s alright...');

		} else {

			self.resultsWindowBedResult
			.color('#d33')
			.text('I hate it');

		}

		// Bathroom score

		self.resultsWindowBathroomItem.text(self.bathroom.bathroom.types[self.bathroom.bathroom.selectedType].name);

		var bathroomScore = self.customer.getScore('bathroom', 'occupation')+self.customer.getScore('bathroom', 'hobby');

		if(bathroomScore==240) {

			self.resultsWindowBathroomResult
			.color('#3d3')
			.text('I love it!');

		} else if(bathroomScore>60) {

			self.resultsWindowBathroomResult
			.color('#333')
			.text('It\'s alright...');

		} else {

			self.resultsWindowBathroomResult
			.color('#d33')
			.text('I hate it');

		}

		// Window score

		self.resultsWindowWindowItem.text(self.window.window.types[self.window.window.selectedType].name);

		var windowScore = self.customer.getScore('window', 'occupation')+self.customer.getScore('window', 'hobby');

		if(windowScore==200) {

			self.resultsWindowWindowResult
			.color('#3d3')
			.text('I love it!');

		} else if(windowScore>60) {

			self.resultsWindowWindowResult
			.color('#333')
			.text('It\'s alright...');

		} else {

			self.resultsWindowWindowResult
			.color('#d33')
			.text('I hate it');

		}

		// Final results

		score = tableScore+bedScore+bathroomScore+windowScore;

		self.resultsWindowScore.text(score);

		var stars = Math.floor(score/200);

		for(var i = 1; i <= 5; i++) {

			if(i<=stars) {

				self['resultsWindowStar'+i].opacity(1);

			} else {

				self['resultsWindowStar'+i].opacity(0);

			}

		}

		console.log(score);

	}

});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }