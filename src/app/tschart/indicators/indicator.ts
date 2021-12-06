import { Drawer } from "../drawers/drawer"
import { Region } from "../region"
import { TsChart } from "../tschat"

export class Indicator implements Drawer {
    constructor(public descricao: string) { }

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region): void { }

    public findLimits(chart: TsChart): any {
        return null
    }

}

export class IndicatorBandaBollinger extends Indicator {

    constructor(descricao: string, private color: string, private backgroundColor: string, private values: number[][]) {
        super(descricao)
    }

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region): void {
        ctx.setLineDash([])
        var n = 0
        var valorAnterior1 = null
        var valorAnterior2 = null
        var valorAnterior3 = null
        for (const valor of this.values[0]) {
            if (valorAnterior1 && valorAnterior2 && valorAnterior3 && this.values[0][n] && this.values[1][n] && this.values[2][n]) {
                const yValorAnterior1 = region.calculateY(valorAnterior1)
                const yValorAnterior2 = region.calculateY(valorAnterior2)
                const yValorAnterior3 = region.calculateY(valorAnterior3)
                const yValor1 = region.calculateY(this.values[0][n])
                const yValor2 = region.calculateY(this.values[1][n])
                const yValor3 = region.calculateY(this.values[2][n])

                const x1 = (n - 0.75) * chart.candleWidth + chart.dx
                const y1 = yValorAnterior3 + region.deltaY
                const x2 = (n + 0.25) * chart.candleWidth + chart.dx
                const y2 = yValor3 + region.deltaY
                const x3 = (n - 0.75) * chart.candleWidth + chart.dx
                const y3 = yValorAnterior1 + region.deltaY
                const x4 = (n + 0.25) * chart.candleWidth + chart.dx
                const y4 = yValor1 + region.deltaY

                var r = new Path2D()
                r.moveTo(x1, y1)
                r.lineTo(x2, y2)
                r.lineTo(x4, y4)
                r.lineTo(x3, y3)
                r.lineTo(x1, y1)
                r.closePath()
                ctx.fillStyle = this.backgroundColor
                ctx.fill(r, 'evenodd')

                // ctx.beginPath() // low band
                // ctx.strokeStyle = this.color
                // ctx.lineWidth = 1;
                // ctx.moveTo(x3, y3)
                // ctx.lineTo(x4, y4)
                // ctx.stroke()
                // ctx.closePath();

                ctx.beginPath()
                ctx.strokeStyle = this.color // middle line
                ctx.lineWidth = 1;
                ctx.moveTo((n - 0.75) * chart.candleWidth + chart.dx, yValorAnterior2 + region.deltaY)
                ctx.lineTo((n + 0.25) * chart.candleWidth + chart.dx, yValor2 + region.deltaY)
                ctx.stroke()
                ctx.closePath();

                // ctx.beginPath()
                // ctx.strokeStyle = this.color // high band
                // ctx.lineWidth = 1;
                // ctx.moveTo(x1, y1)
                // ctx.lineTo(x2, y2)
                // ctx.stroke()
                // ctx.closePath();
            }
            valorAnterior1 = this.values[0][n]
            valorAnterior2 = this.values[1][n]
            valorAnterior3 = this.values[2][n]
            n++
        }
    }

    public findLimits(chart: TsChart): any {
        var n = 0
        var minYValue = 1e10
        var maxYValue = -1e10
        for (const valor of this.values[0]) {
            const min = this.values[0][n]
            const max = this.values[2][n]
            const x = n * chart.candleWidth + chart.dx
            if (x > -50 && x < chart.canvas.width + 50) {
                if (max && max > maxYValue) {
                    maxYValue = max
                }
                if (min && min < minYValue) {
                    minYValue = min
                }
            }
            n++
        }
        const limits = { min: minYValue - 0.1 * (maxYValue - minYValue), max: maxYValue + 0.1 * (maxYValue - minYValue) }
        console.log(limits)
        return limits
        //        return { min: 29000, max: 29555 }
    }
}

export class IndicatorSimple extends Indicator {

    constructor(descricao: string, public color: string, private values: (number | null)[]) {
        super(descricao)
    }

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region): void {
        ctx.setLineDash([])
        var n = 0
        var valorAnterior = null
        for (const valor of this.values) {
            if (valorAnterior && valor) {
                const yValorAnterior = region.calculateY(valorAnterior)
                const yValor = region.calculateY(valor)
                ctx.beginPath()
                ctx.strokeStyle = this.color
                ctx.lineWidth = 1;
                ctx.moveTo((n - 0.75) * chart.candleWidth + chart.dx, yValorAnterior + region.deltaY)
                ctx.lineTo((n + 0.25) * chart.candleWidth + chart.dx, yValor + region.deltaY)
                ctx.stroke()
                ctx.closePath();
            }
            valorAnterior = valor
            n++
        }
    }

}

export class IndicatorVolume extends Indicator {

    constructor(descricao: string, public color: string, private values: number[]) {
        super(descricao)
    }

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region): void {
        ctx.setLineDash([])
        var n = 0
        for (const valor of this.values) {
            const yValor = region.calculateY(valor)
            ctx.fillStyle = "#000000"
            ctx.fillRect(n * chart.candleWidth + chart.dx, yValor + region.deltaY, chart.candleWidth / 2, 10)
            n++
        }
    }

}

export class IndicatorRfi extends Indicator {

    constructor(descricao: string, private color: string) {
        super(descricao)
    }

    public draw(ctx: CanvasRenderingContext2D, chart: TsChart, region: Region): void {
        ctx.fillStyle = this.color
        ctx.fillRect(0, region.deltaY, region.width, region.height)
    }

}
