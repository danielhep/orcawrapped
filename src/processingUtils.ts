import { parse } from 'date-fns'
import Papa from 'papaparse'
import { AppState } from './components/AppContext'
import { OrcaCSVOutput, ProcessedOrcaData, ExtraDataType } from './types'
import { routeOccurrences } from './basicStats'
import { dollarStringToNumber, parseActivity } from './propertyTransformations'

async function parseFile (file: File): Promise<OrcaCSVOutput> {
  return await new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (res) => resolve(res.data),
      error: (err) => reject(err)
    })
  })
}

async function processAllRows (rows: OrcaCSVOutput): Promise<ProcessedOrcaData[]> {
  return rows.map(row => {
    const lineMatch = row.Location.match(/Line: ([^,]*)/)
    const stopMatch = row.Location.match(/Stop: (.*)/)
    const routeNumberMatch = row.Location.match(/(\d+(-Line)?)|([A-F] Line)/)
    return {
      cost: dollarStringToNumber(row['+/-']),
      balance: dollarStringToNumber(row.Balance),
      time: parse(`${row.Date} ${row.Time}`, 'M/d/yyyy h:mmaa', new Date()),
      line: lineMatch?.[1],
      stop: stopMatch?.[1],
      routeNumber: routeNumberMatch?.[0],
      agency: row.Agency,
      activity: parseActivity(row.Activity)
    }
  })
}

function generateExtraDataObject (data: ProcessedOrcaData[]): ExtraDataType {
  return {
    routeOccurrences: routeOccurrences(data)
  }
}

export async function parseOrcaFiles (files: File[]): Promise<AppState> {
  const allPromii = await Promise.all(files.map(parseFile))
  const processed = await processAllRows(allPromii[0])
  const extraData = generateExtraDataObject(processed)

  return { processed, extraData }
}
