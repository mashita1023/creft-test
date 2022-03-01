import { useState } from 'react'
import { CellBase, createEmptyMatrix, Spreadsheet } from 'react-spreadsheet'

export const SpreadsheetPage = () => {
  /*
  const [data, setData] = useState([
    [{ value: 'Vanilla' }, { value: 'Chocolate' }],
    [{ value: 'Strawberry' }, { value: 'Cookies' }],
  ])
*/
  const [data, setData] = useState(createEmptyMatrix<CellBase>(5, 5))

  const columnLabels = ['test', 'test#2', 'test#3', 'test#4']

  const rowLabels = ['名前', '局', '6:00', '7:00', '8:00', '9:00', '10:00']

  return (
    <Spreadsheet
      data={data}
      columnLabels={columnLabels}
      rowLabels={rowLabels}
      onChange={(e) => {
        console.log(e)
        console.log(createEmptyMatrix)
        setData
      }}
    />
  )
}
