declare global {
  interface Window {
    PIXI: any;
    Live2DModel: any;
  }
}

export async function initLive2D(canvas: HTMLCanvasElement) {
  const app = new window.PIXI.Application({
    view: canvas,
    autoStart: true,
    resizeTo: window,
    backgroundAlpha: 0,
  });

  const model = await window.PIXI.live2d.Live2DModel.from(
    "/models/standard/cat.model3.json",
  );

  app.stage.addChild(model);

  model.scale.set(0.5);
  model.anchor.set(0.5);
  model.x = app.renderer.width / 2;
  model.y = app.renderer.height / 2;

  return app;
}
