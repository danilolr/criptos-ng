import { Drawer } from './drawers/drawer'
import { Indicator } from './indicators/indicator'
import { Region } from './region'

var th: TsChart

export class TsChart {

    public canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D | null
    public mouseX: number = 0
    public mouseY: number = 0
    public dx: number = 0
    private isDragging: boolean = false
    private regions: Region[] = []
    public candleWidth: number = 14
    private regionBuilders: RegionBuilder[] = []
    public candles: CandleInfo[] = []
    public minYValue: number = 1e10
    public maxYValue: number = -1e10

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        th = this
    }

    setCandles(candles: CandleInfo[]) {
        this.candles = candles
    }

    addRegion(height: number): RegionBuilder {
        const rb = new RegionBuilder(height)
        this.regionBuilders.push(rb)
        return rb
    }

    findCandlePosition(position: string) {
        var n = 0
        for (var candle of this.candles) {
            if (candle.dataHora == position) {
                return n
            }
            n++
        }
        return null
    }

    mouseDown(event: MouseEvent): void {
        th.mouseX = event.offsetX
        th.mouseY = event.offsetY
        th.isDragging = true
    }

    mouseMove(event: MouseEvent): void {
        if (th.isDragging) {
            th.dx += event.offsetX - th.mouseX
        }
        th.mouseX = event.offsetX
        th.mouseY = event.offsetY
        th.draw()
    }

    mouseUp(event: MouseEvent): void {
        this.mouseX = event.offsetX
        this.mouseY = event.offsetY
        th.isDragging = false
    }

    mouseWell(event: WheelEvent) {
        if (event.deltaY > 0) {
            th.candleWidth = th.candleWidth * 0.9
            if (th.candleWidth < 1) {
                th.candleWidth = 1
            }
        } else {
            th.candleWidth = th.candleWidth * (1 / 0.9)
        }
        th.draw()
    }

    run() {
        var totalH = this.canvas.height

        for (var rb of this.regionBuilders) {
            if (rb.height != 0) {
                totalH -= rb.height
            }
        }

        var deltaY = 0

        for (var rb of this.regionBuilders) {
            if (rb.height == 0) {
                rb.height = totalH
            }
            const region = rb.build(this, this.canvas.width, deltaY)
            this.regions.push(region)

            deltaY += region.height
        }

        this.canvas.addEventListener('mousedown', this.mouseDown)
        this.canvas.addEventListener('mousemove', this.mouseMove)
        this.canvas.addEventListener('mouseup', this.mouseUp)
        this.canvas.addEventListener('wheel', this.mouseWell)
        this.draw()
    }

    draw() {
        if (!th.ctx) {
            return
        }

        var ctx = th.ctx
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, th.canvas.width, th.canvas.height)
        for (var region of this.regions) {

            this.findLimits(region)
            for (var i of region.drawers) {
                if (i instanceof Indicator) {
                    const limits = (i as Indicator).findLimits(this)
                    if (limits) {
                        if (limits.min < this.minYValue) {
                            this.minYValue = limits.min
                        }
                        if (limits.max > this.maxYValue) {
                            this.maxYValue = limits.max
                        }
                    }
                }
            }
            ctx.save()
            ctx.beginPath()
            ctx.rect(0, region.deltaY, region.width, region.height)
            ctx.clip()
            region.draw(ctx, this.dx, this.candleWidth, this.mouseX, this.mouseY)
            ctx.restore()
            ctx.beginPath()
            ctx.strokeStyle = "#000000"
            ctx.lineWidth = 1;
            ctx.rect(0, region.deltaY, region.width, region.height)
            ctx.stroke()
            ctx.closePath()
        }
    }

    findLimits(region: Region) {
        if (region.limitHandler) {
            const limit = region.limitHandler()
            this.maxYValue = limit.max
            this.minYValue = limit.min
            return
        }
        var n = 0
        this.minYValue = 1e10
        this.maxYValue = -1e10
        for (var candle of this.candles) {
            const x = n * this.candleWidth + this.dx
            if (x > -50 && x < this.canvas.width + 50) {
                if (candle.high > this.maxYValue) {
                    this.maxYValue = candle.high
                }
                if (candle.low < this.minYValue) {
                    this.minYValue = candle.low
                }
            }
            n++
        }
        this.maxYValue = this.maxYValue + 0.1 * (this.maxYValue - this.minYValue)
        this.minYValue = this.minYValue - 0.1 * (this.maxYValue - this.minYValue)
    }

    calculateCandle(dx: number, candleWidth: number, mouseX: number) {
        var candlePos = mouseX - dx
        candlePos = candlePos / candleWidth
        candlePos = candlePos - 0.25
        candlePos = Math.round(candlePos)
        return candlePos
    }
}

class RegionBuilder {

    public drawers: Drawer[] = []

    private callback: (() => any) | null = null

    constructor(public height: number) { }

    addDrawer(drawer: Drawer): void {
        this.drawers.push(drawer)
    }

    setLimitHandler(callback: () => { min: number; max: number }) {
        this.callback = callback
    }

    public build(chart: TsChart, width: number, deltaY: number): Region {
        const r = new Region(chart, this.height, width, deltaY)
        r.limitHandler = this.callback
        for (var drawer of this.drawers) {
            r.addDrawer(drawer)
        }
        return r
    }

}

export interface CandleInfo {

    dataHora: string
    open: number
    close: number
    high: number
    low: number

}

