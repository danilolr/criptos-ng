import { Region } from "../region"
import { CandleInfo, TsChart } from "../tschat"
import { Drawer } from "./drawer"

export class DateDrawer implements Drawer {


    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region) {
        const valueCandle = chart.calculateCandle(chart.dx, chart.candleWidth, chart.mouseX)
        if (valueCandle > 0) {
            const candle = chart.candles[valueCandle]
            const tw = ctx.measureText(candle.dataHora).width
            ctx.fillStyle = "#000000"
            ctx.fillRect(valueCandle * chart.candleWidth + chart.dx - (tw / 2) - 15, region.deltaY, tw + 70, region.height)
            ctx.font = '16px serif'
            ctx.fillStyle = "#FFFFFF"
            ctx.fillText(`${candle.dataHora}`, (valueCandle + 0.25) * chart.candleWidth + chart.dx - (tw / 2), 15 + region.deltaY)
        }
    }
}

type CallbackRender = (ctx: CanvasRenderingContext2D, chart: TsChart, region: Region, candle: CandleInfo, position: number) => void;