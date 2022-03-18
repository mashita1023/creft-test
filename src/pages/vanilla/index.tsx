import json from '../../assets/api.json'
import './index.css'
type Json = typeof json

type Task = {
  task_id: number
  task: string
  time_id: number
  time: string
}

type User = {
  name: string
  bureau: string
  tasks: Task[]
}

const user: Json = json
export const VanillaPage = () => {
  const renderTask = (u: User) => {
    return u.tasks.map((t, i) => {
      return <td key={u.name + 'task-' + i}>{t.task}</td>
    })
  }
  const renderRows = () => {
    return user.users.map((u, i) => {
      return (
        <tr key={'item-' + i}>
          <th key={'user-' + i}>{u.name}</th>
          <th key={'bureau-' + i}>{u.bureau}</th>
          {renderTask(u)}
        </tr>
      )
    })
  }

  const renderHeader = () => {
    return json.users[0].tasks.map((t, i) => {
      return <th>{t.time}</th>
    })
  }

  return (
    <div className="Stickey-Table">
      <table className="Sticky__Table">
        <thead>
          <tr>
            <th>name</th>
            <th>bureau</th>
            {renderHeader()}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  )
}
