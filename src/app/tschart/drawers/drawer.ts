import { Region } from "../region";
import { TsChart } from "../tschat";

export interface Drawer {

    draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region): void

}

export class CrossDrawer implements Drawer {

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region) {
        ctx.beginPath()
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5])
        ctx.moveTo(chart.mouseX, region.deltaY)
        ctx.lineTo(chart.mouseX, region.deltaY + region.height)
        if (chart.mouseY > region.deltaY && chart.mouseY < region.deltaY + region.height) {
            ctx.moveTo(0, chart.mouseY)
            ctx.lineTo(region.width, chart.mouseY)
        }
        ctx.stroke()
        ctx.closePath();
    }

}

export class CandleDrawer implements Drawer {

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region) {
        var n = 0
        for (var candle of chart.candles) {
            const yOpen = region.calculateY(candle.open)
            const yClose = region.calculateY(candle.close)
            const yHigh = region.calculateY(candle.high)
            const yLow = region.calculateY(candle.low)
            if (candle.open > candle.close) {
                ctx.fillStyle = "#FF0000"
                ctx.fillRect(n * chart.candleWidth + chart.dx, yClose, chart.candleWidth / 2, yOpen - yClose)
            } else {
                ctx.fillStyle = "#00FF00"
                ctx.fillRect(n * chart.candleWidth + chart.dx, yOpen, chart.candleWidth / 2, yClose - yOpen)
            }
            ctx.setLineDash([])
            ctx.beginPath()
            ctx.strokeStyle = ctx.fillStyle
            ctx.lineWidth = 1;
            ctx.moveTo((n + 0.25) * chart.candleWidth + chart.dx, yHigh)
            ctx.lineTo((n + 0.25) * chart.candleWidth + chart.dx, yLow)
            ctx.stroke()
            ctx.closePath()
            n++
        }
    }

}
