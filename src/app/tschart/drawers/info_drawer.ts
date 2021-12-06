import { Region } from "../region"
import { TsChart } from "../tschat"
import { Drawer } from "./drawer"

export class InfoDrawer implements Drawer {

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region) {
        ctx.font = '16px serif'
        ctx.fillStyle = "#000000"

        const valueMousePos = Math.round(region.calculatePrice(chart.mouseY) * 100) / 100
        ctx.fillText(`${valueMousePos}`, 15, 15 + region.deltaY)

        // const valueCandle = region.calculateCandle(chart.dx, chart.candleWidth, chart.mouseX)
        // if (valueCandle > 0) {
        //     const candle = region.candles[valueCandle]
        //     ctx.fillText(`${candle.dataHora}`, 130, 30)
        // }
    }
}
