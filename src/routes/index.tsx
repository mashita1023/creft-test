import { Routes, Route } from 'react-router-dom'
import { TodoPage } from '../pages/todo'
import { NotFound } from '../pages/error/notfound'

export const AppRoute = () => {
  return (
    <Routes>
      {/* 404 */}
      <Route path='*' element={<NotFound />} />

      {/* root */}
      <Route index element={<TodoPage />} />

      {/* todo */}
      <Route path='todo' element={<TodoPage />} />

    </Routes>
  )
}
