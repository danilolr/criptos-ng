import { Region } from "../region"
import { CandleInfo, TsChart } from "../tschat"
import { Drawer } from "./drawer"

export class InfoDrawer implements Drawer {

    private callbackInfo: CallbackRender

    constructor(callbackInfo: CallbackRender | null) {
        if (callbackInfo) {
            this.callbackInfo = callbackInfo
        } else {
            this.callbackInfo = this.standardRender
        }
    }

    private standardRender(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region, candle: CandleInfo, position: number): void {
        ctx.font = '16px serif'
        ctx.fillStyle = "#000000"
        const valueMousePos = Math.round(region.calculatePrice(chart.mouseY) * 100) / 100
        ctx.fillText(`${valueMousePos}`, 15, 15 + region.deltaY)
    }

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region) {
        if (chart.mouseY > region.deltaY && chart.mouseY < region.deltaY + region.height) {
            const valueCandle = chart.calculateCandle(chart.dx, chart.candleWidth, chart.mouseX)
            if (valueCandle > 0) {
                const candle = chart.candles[valueCandle]
                this.callbackInfo(ctx, chart, region, candle, valueCandle)
            }
        }
    }
}

type CallbackRender = (ctx: CanvasRenderingContext2D, chart: TsChart, region: Region, candle: CandleInfo, position: number) => void;