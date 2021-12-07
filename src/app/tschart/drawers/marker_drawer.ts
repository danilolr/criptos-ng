import { Region } from "../region"
import { TsChart } from "../tschat"
import { Drawer } from "./drawer"
import { Marker } from "../markers"

export class MarkerDrawer implements Drawer {

    constructor(private markers: Marker[]) { }

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region) {
        for (var marker of this.markers) {
            const candlePositon = chart.findCandlePosition(marker.time)
            if (candlePositon) {
                ctx.beginPath()
                ctx.fillStyle = "#FF00FF"
                ctx.fillRect(candlePositon * chart.candleWidth + chart.dx, 50, chart.candleWidth, 20)
                ctx.closePath();
            }
        }
    }

}