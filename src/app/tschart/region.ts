import { Drawer } from "./drawers/drawer";
import { TsChart } from "./tschat";

export class Region {

    public offsetX: number = 200;
    public offsetY: number = 30;
    limitHandler: (() => { min: number; max: number; }) | null = null;

    constructor(private chart: TsChart, public height: number, public width: number, public deltaY: number) { }

    public drawers: Drawer[] = []

    public draw(ctx: CanvasRenderingContext2D, dx: number, candleWidth: number, mouseX: number, mouseY: number) {
        for (var drawer of this.drawers) {
            drawer.draw(ctx, this.chart, this)
        }
    }

    addDrawer(drawer: Drawer) {
        this.drawers.push(drawer)
    }

    calculateY(value: number) {
        var y = value - this.chart.minYValue
        y = y / (this.chart.maxYValue - this.chart.minYValue)
        y = y * this.height
        return this.height - y
    }

    calculatePrice(y: number) {
        var valor = this.height - (y - this.deltaY)
        valor = valor / this.height
        valor = valor * (this.chart.maxYValue - this.chart.minYValue)
        valor = valor + this.chart.minYValue
        return valor
    }

}