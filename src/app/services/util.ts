import * as moment from 'moment'

export function converteDataHoraParaString(dataHora) {
    return dataHora == null ? null : moment(dataHora).format('DD/MM/YYYY HH:mm:ss')
}

export function converteDataParaString(dataHora) {
    return dataHora == null ? null : moment(dataHora).format('DD/MM/YYYY')
}

export function converteDataParaPhpString(dataHora) {
    return dataHora == null ? null : moment(dataHora).format('DD.MM.YYYY')
}

export function converteStringParaDataHora(dataHora) {
    return dataHora == null ? null : moment(dataHora, 'DD/MM/YYYY HH:mm:ss').toDate()
}

export function converteStringParaDate(data) {
    return data == null ? null : moment(data, 'DD/MM/YYYY').toDate()
}

export function isDateValida(data: any) {
    return data instanceof Date
}

export function adicionaDias(data: any, dias: number) {
    return moment(data).add(dias, 'days').toDate()
}

export function converteStringParaUnixTimestamp(dataHora: any) {
    const d = converteStringParaDataHora(dataHora)
    const ts = Math.round(d.getTime() / 1000)
    return ts
}