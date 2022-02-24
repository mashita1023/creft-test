import { Routes, Route } from 'react-router-dom'
import { TodoPage } from '../pages/todo'
import { NotFound } from '../pages/error/notfound'
import { HandsontablePage } from '../pages/handsontable'
import { SpreadsheetPage } from '../pages/spreadsheet'
import { ReactgridPage } from '../pages/reactgrid'

export const AppRoute = () => {
  return (
    <Routes>
      {/* 404 */}
      <Route path="*" element={<NotFound />} />

      {/* root */}
      <Route index element={<TodoPage />} />

      {/* todo */}
      <Route path="todo" element={<TodoPage />} />

      {/* handsontable */}
      <Route path="handsontable" element={<HandsontablePage />} />

      {/* spreadsheet */}
      <Route path="spreadsheet" element={<SpreadsheetPage />} />

      {/* reactgrid */}
      <Route path="reactgrid" element={<ReactgridPage />} />
    </Routes>
  )
}
