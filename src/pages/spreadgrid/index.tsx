import { useState } from 'react'
import { Spreadsheet } from 'react-spreadsheet'

export const SpreadsheetPage = () => {
  const [data, setData] = useState([
    [{ value: 'Vanilla' }, { value: 'Chocolate' }],
    [{ value: 'Strawberry' }, { value: 'Cookies' }],
  ])

  return <Spreadsheet data={data} onChange={() => setData} />
}
