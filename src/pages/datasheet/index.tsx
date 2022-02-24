/**
import react

export const DatasheetPage = () => {
  return (
    <div></div>
  )
}
 */

import 'react'
import { HotTable } from '@handsontable/react'
import 'handsontable/dist/handsontable.full.css'

export const DatasheetPage = () => {
  const data = [
    ['', 'Tesla', 'Mercedes', 'toyota', 'Volvo'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
  ]
  return (
    <HotTable
      data={data}
      colHeaders={true}
      rowHeaders={true}
      width="600"
      height="300"
    />
  )
}
