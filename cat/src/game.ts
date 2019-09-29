import MainScene from "./scenes/mainScene";
import Perface from './perface';
declare type CatchTheCatGameConfig = {
    /**
     * grid columns
     */
    w: number,
    /**
     * grid rows
     */
    h: number,
    /**
     * grid circle radius
     */
    r: number,
    /**
     * The background color of the game canvas. The default is black.
     */
    backgroundColor?: string | number;
    /**
     * The DOM element that will contain the game canvas, or its `id`. If null (the default) or if the named element doesn't exist, the game canvas is inserted directly into the document body.
     */
    parent?: HTMLElement | string;
    /**
     * 'left' or 'center'
     */
    statusBarAlign?: string;
    /**
     * text at bottom right corner
     */
    credit?: string;
};
/*!
 * Catch The Cat Game
 *
 * https://github.com/ganlvtech/phaser-catch-the-cat
 */
export default class CatchTheCatGame extends Phaser.Game {
    public readonly mainScene: MainScene;
    public readonly myConfig: CatchTheCatGameConfig;
    public readonly perface:Perface;
    constructor(config: CatchTheCatGameConfig) {
        

        if (!config.credit) {
            config.credit = "2.0 github.com/EditFly; 1.0 github.com/ganlvtech";
            //  config.credit = "github.com/ganlvtech";
        }
        if (!config.backgroundColor) {
            config.backgroundColor = 0xeeeeee;
        }

        let w = config.w;
        let h = config.h;
        let r = config.r * window.devicePixelRatio;
        console.log(w,h,r);
        let canvasZoom = 1 / window.devicePixelRatio;
        let canvasWidth = Math.floor((6.5 + 2 * w) * r);
        let canvasHeight = Math.floor((6 + Math.sqrt(3) * h) * r);
        let scene = new MainScene(w, h, r);
        const gameConfig: GameConfig = {
            width: canvasWidth,
            height: canvasHeight,
            type: Phaser.AUTO,
            parent: config.parent,
            backgroundColor: config.backgroundColor,
            scene: scene,
            zoom: canvasZoom,
        };
        super(gameConfig);
        this.myConfig = config;
        this.mainScene = scene;
        this.perface=new Perface();
    }

    private _solver;

    get solver() {
        return this._solver;
    }

    set solver(value) {
        this._solver = value;
        try {
            this.mainScene.cat.solver = value;
        } finally {
        }
    }
}
