import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { GraphqlService } from 'src/app/services/graphql/graphql.service'
import { createChart, CrosshairMode } from 'lightweight-charts'
import * as util from "../../services/util"
import { CotacaoHistoricoValor } from 'src/app/services/graphql/graphql-base'

@Component({
  selector: 'app-backtesting',
  templateUrl: './backtesting.component.html',
  styleUrls: ['./backtesting.component.css']
})
export class BacktestingComponent implements OnInit {

  public processando = true
  public resultado = []
  public cotacoes = []
  public indicadores = []

  constructor(private graphqlService: GraphqlService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idCotacaoHistorico = this.route.snapshot.params['idCotacaoHistorico']
    const estrategia = this.route.snapshot.params['estrategia']
    this.executaBacktest(idCotacaoHistorico, estrategia)
  }

  async executaBacktest(idCotacaoHistorico: number, estrategia: string) {
    const resp = await this.graphqlService.mutation(`
    mutation {
      executaBacktest(idCotacaoHistorico:${idCotacaoHistorico}, nomeEstrategia:"${estrategia}") {
        ok
        msg
        resultado {
          entrada {
            dataHora
            tipo
            valor
          }
          saida {
            dataHora
            tipo
            valor
          }
          percResultado
        }
        operacoes {
          dataHora
          tipo
          valor
        }
        indicadores {
          descricao
          cor
          valores
          grafico
        }    
        cotacoes {
          id
          dataHora
          open
          close
          high
          low
          volume
        }
      }
    }
    `, null)
    this.indicadores = resp['indicadores']
    this.cotacoes = resp['cotacoes']
    var p = 0
    for (let c of this.cotacoes) {
      c.indicador = []
      for (let i of this.indicadores) {
        c.indicador.push(i['valores'][p])
      }
      p++
    }
    this.buildChart(this.cotacoes, resp['operacoes'], this.indicadores)
    this.resultado = resp['resultado']
    var rGeral = 0
    for (let r of this.resultado) {
      rGeral += r.percResultado
    }
    this.resultado.push({ percResultado: rGeral })
    this.processando = false
    document.getElementById('r').style.display = ''
  }

  buildChart(cotacoes, operacoes, indicadores) {
    var chart = createChart(document.getElementById("chat"), {
      width: 1500,
      height: 800,
      localization: {
        timeFormatter: (dt) => {
          return util.converteDataHoraParaString(new Date(dt * 1000))
        }
      },
      layout: {
        backgroundColor: '#FFFFFF',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    })

    // var chart2 = createChart(document.getElementById("chat2"), {
    //   width: 1500,
    //   height: 100,
    //   localization: {
    //     timeFormatter: (dt) => {
    //       return util.converteDataHoraParaString(new Date(dt * 1000))
    //     }
    //   },
    //   layout: {
    //     backgroundColor: '#FFFFFF',
    //     textColor: 'rgba(255, 255, 255, 0.9)',
    //   },
    //   grid: {
    //     vertLines: {
    //       color: 'rgba(197, 203, 206, 0.5)',
    //     },
    //     horzLines: {
    //       color: 'rgba(197, 203, 206, 0.5)',
    //     },
    //   },
    //   crosshair: {
    //     mode: CrosshairMode.Normal,
    //   },
    //   rightPriceScale: {
    //     borderColor: 'rgba(197, 203, 206, 0.8)',
    //   },
    //   timeScale: {
    //     borderColor: 'rgba(197, 203, 206, 0.8)',
    //   },
    // })

    var candleSeries = chart.addCandlestickSeries({
      upColor: 'rgba(0, 255, 0, 1)',
      downColor: 'rgba(255, 0, 0, 1)',
      borderDownColor: 'rgba(255, 144, 0, 1)',
      borderUpColor: 'rgba(255, 144, 0, 1)',
      wickDownColor: 'rgba(255, 144, 0, 1)',
      wickUpColor: 'rgba(255, 144, 0, 1)',
    })

    const data = this.converteCotacoesParaGrafico(cotacoes)
    candleSeries.setData(data)

    for (var indicador of indicadores) {
      var lineSeries
      if (indicador.grafico == 0) {
        lineSeries = chart.addLineSeries({
          lineWidth: 2,
          color: indicador.cor
        })
        const sd = this.criaLineSeries(cotacoes, indicador['valores'])
        lineSeries.setData(sd)
      } else {
        // console.log("grafico2 " + indicador.grafico)
        // lineSeries = chart.addLineSeries({
        //   priceScaleId: 'X',
        //   lineWidth: 2,
        //   color: indicador.cor
        // })
      }

    }



    // const lineSeries = chart.addLineSeries({
    //   lineWidth: 2
    // });
    // const sd = this.criaLineSeries(cotacoes, 0)
    // lineSeries.setData(sd)


    // const hSeries = chart.addHistogramSeries({
    //   color: "#26a69a",
    //   priceFormat: {
    //     type: "percent"
    //   },

    //   priceScaleId: '',
    //   scaleMargins: {
    //     top: 0.9,
    //     bottom: 0
    //   }
    // })
    // const hd = this.criaHSeries(cotacoes)
    // hSeries.setData(hd)

    // const areaSeries = chart.addAreaSeries()
    // const ad = this.criaAreaSeries(cotacoes)
    // areaSeries.setData(ad)

    var markers = []

    for (var operacao of operacoes) {
      if (operacao.tipo == "COMPRA") {
        markers.push({ time: util.converteStringParaUnixTimestamp(operacao.dataHora), position: 'belowBar', color: '#2196F3', shape: 'arrowUp', text: 'C @ ' + operacao.valor })
      } else {
        markers.push({ time: util.converteStringParaUnixTimestamp(operacao.dataHora), position: 'aboveBar', color: '#e91e63', shape: 'arrowDown', text: 'V @ ' + operacao.valor })
      }
    }

    candleSeries.setMarkers(markers)
  }

  criaHSeries(cotacoes: any): any[] {
    var r = []
    for (var cotacao of cotacoes) {
      r.push({ time: util.converteStringParaUnixTimestamp(cotacao.dataHora), value: Math.random() * 100 })
    }
    return r
  }

  criaAreaSeries(cotacoes: any): any[] {
    var r = []
    for (var cotacao of cotacoes) {
      r.push({ time: util.converteStringParaUnixTimestamp(cotacao.dataHora), value: (cotacao.high + cotacao.low) / 2 })
    }
    return r
  }

  criaLineSeries(cotacoes: CotacaoHistoricoValor[], valores: number[]): any[] {
    var r = []
    for (let n = 0; n < valores.length; n++) {
      if (valores[n]) {
        r.push({ time: util.converteStringParaUnixTimestamp(cotacoes[n].dataHora), value: valores[n] })
      }
    }
    return r
  }

  converteCotacoesParaGrafico(cotacoes: CotacaoHistoricoValor[]) {
    var r = []
    for (var cotacao of cotacoes) {
      r.push({ time: util.converteStringParaUnixTimestamp(cotacao.dataHora), open: cotacao.open, high: cotacao.high, low: cotacao.low, close: cotacao.close })
    }
    return r
  }

}
