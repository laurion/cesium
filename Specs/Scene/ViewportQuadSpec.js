/*global defineSuite*/
defineSuite([
         'Scene/ViewportQuad',
         'Specs/createContext',
         'Specs/destroyContext',
         'Specs/createCamera',
         'Specs/createFrameState',
         'Specs/frameState',
         'Specs/pick',
         'Specs/render',
         'Core/BoundingRectangle',
         'Core/Cartesian3',
         'Core/Color',
         'Renderer/ClearCommand',
         'Scene/Material'
     ], function(
         ViewportQuad,
         createContext,
         destroyContext,
         createCamera,
         createFrameState,
         frameState,
         pick,
         render,
         BoundingRectangle,
         Cartesian3,
         Color,
         ClearCommand,
         Material) {
    "use strict";
    /*global jasmine,describe,xdescribe,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn,runs,waits,waitsFor*/

    var context;
    var viewportQuad;
    var us;
    var testImage;

    beforeAll(function() {
        context = createContext();
        testImage = new Image();
        testImage.src = './Data/Images/Red16x16.png';

    });

    afterAll(function() {
        destroyContext(context);
    });

    beforeEach(function() {
        viewportQuad = new ViewportQuad();
        viewportQuad.rectangle = new BoundingRectangle(0, 0, 2, 2);

        us = context.getUniformState();
        us.update(createFrameState(createCamera(context)));
    });

    afterEach(function() {
        viewportQuad = viewportQuad && viewportQuad.destroy();
        us = undefined;
    });

    it('constructs with a rectangle', function() {
        var rectangle = new BoundingRectangle(1.0, 2.0, 3.0, 4.0);
        var quad = new ViewportQuad(rectangle);
        expect(quad.rectangle).toEqual(rectangle);
    });

    it('constructs with a material', function() {
        var material = Material.fromType(undefined, Material.ErosionType);
        var quad = new ViewportQuad(undefined, material);
        expect(quad.material.type).toEqual(material.type);
    });

    it('gets the default color', function() {
        expect(viewportQuad.material.uniforms.color).toEqual(
            new Color(1.0, 1.0, 1.0, 1.0));
    });

    it('throws when rendered with without a rectangle', function() {
        viewportQuad.rectangle = undefined;

        expect(function() {
            render(context, frameState, viewportQuad);
        }).toThrow();
    });

    it('throws when rendered with without a material', function() {
        viewportQuad.material = undefined;

        expect(function() {
            render(context, frameState, viewportQuad);
        }).toThrow();
    });

    it('does not render when show is false', function() {
        ClearCommand.ALL.execute(context);
        expect(context.readPixels()).toEqual([0, 0, 0, 0]);

        viewportQuad.show = false;
        render(context, frameState, viewportQuad);
        expect(context.readPixels()).toEqual([0, 0, 0, 0]);
    });

    it('renders material', function() {
        ClearCommand.ALL.execute(context);
        expect(context.readPixels()).toEqual([0, 0, 0, 0]);

        render(context, frameState, viewportQuad);
        expect(context.readPixels()).not.toEqual([0, 0, 0, 0]);
    });

    it('renders user created texture', function() {

        waitsFor( function() {
            return testImage.complete;
        }, 'Load test image for texture test.', 3000);

        runs( function() {
            var texture = context.createTexture2D({
                source : testImage
            });

            viewportQuad.material = Material.fromType(context, Material.ImageType);
            viewportQuad.material.uniforms.image = texture;

            ClearCommand.ALL.execute(context);
            expect(context.readPixels()).toEqual([0, 0, 0, 0]);

            render(context, frameState, viewportQuad);
            expect(context.readPixels()).toEqual([255, 0, 0, 255]);
        });
    });

    it('isDestroyed', function() {
        var boundRectangle = new BoundingRectangle(0, 0, 10, 10);
        var vq = new ViewportQuad(boundRectangle);

        expect(vq.isDestroyed()).toEqual(false);
        vq.destroy();
        expect(vq.isDestroyed()).toEqual(true);
    });
}, 'WebGL');
