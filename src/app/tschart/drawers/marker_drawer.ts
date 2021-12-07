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
                const tw = ctx.measureText(marker.text).width
                var candle = chart.candles[candlePositon]
                var py = 0
                if (marker.position == "ABOVE") {
                    py = region.calculateY(candle.high) - 40

                } else {
                    py = region.calculateY(candle.low) + 20
                }

                ctx.beginPath()
                ctx.fillStyle = marker.color
                ctx.fillRect(candlePositon * chart.candleWidth + chart.dx - tw / 2 - chart.candleWidth / 2, py, tw + 30, 20)
                ctx.closePath();
                ctx.font = '16px serif'
                ctx.fillStyle = "#FFFFFF"
                ctx.fillText(`${marker.text}`, candlePositon * chart.candleWidth + chart.dx - tw / 2 - chart.candleWidth / 2 + 1, py + 14)

            }
        }
    }

}