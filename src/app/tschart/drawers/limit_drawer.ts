import { Region } from "../region";
import { TsChart } from "../tschat";
import { Drawer } from "./drawer";

export class LimitDrawer implements Drawer {

    constructor(private min: number, private max: number, private color: string) { }

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region) {
        const yMin = region.calculateY(this.min)
        const yMax = region.calculateY(this.max)
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(0, yMax + region.deltaY, region.width, yMin - yMax)
        ctx.closePath();
    }

}