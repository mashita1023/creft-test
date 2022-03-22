import { useState, useEffect } from 'react'

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
  id: number
  name: string
  bureau: string
  tasks: Task[]
}

const newUser = () => {
  const user: User[] = [
    {
      id: 0,
      name: '',
      bureau: '',
      tasks: [
        {
          task_id: 0,
          task: '',
          time_id: 0,
          time: '',
        },
      ],
    },
  ]

  return user
}

const addUser = (user: User[]) => {
  user.push({
    id: user[-1].id + 1,
    name: '',
    bureau: '',
    tasks: [
      {
        task_id: 0,
        task: '',
        time_id: 0,
        time: '',
      },
    ],
  })

  return user
}

const user: Json = json
export const VanillaPage = () => {
  const [shifts, setShifts] = useState<User[]>(newUser)

  let unmounted = false

  const handleOnEditName = (userId: number, name: string) => {
    const deepCopy = shifts.map((shift) => ({ ...shift }))

    const newShifts = deepCopy.map((shift) => {
      if (shift.id === userId) {
        shift.name = name
      }
      return shift
    })

    setShifts(newShifts)
  }

  const handleOnEditBureau = (userId: number, bureau: string) => {
    const deepCopy = shifts.map((shift) => ({ ...shift }))

    const newShifts = deepCopy.map((shift) => {
      if (shift.id === userId) {
        shift.bureau = bureau
      }
      return shift
    })

    setShifts(newShifts)
  }

  const handleOnEditTask = (userId: number, timeId: number, task: string) => {
    const deepCopy = shifts.map((shift) => ({ ...shift }))

    const newShifts = deepCopy.map((shift) => {
      if (shift.id === userId) {
        shift.tasks.map((t) => {
          if (t.time_id === timeId) {
            t.task = task
          }
          return t
        })
      }
      return shift
    })

    setShifts(newShifts)
  }

  useEffect(() => {
    async function getJson() {
      setShifts(json.users)
    }

    getJson()
    unmounted = true
  }, [unmounted])

  const renderRows = () => {
    return shifts.map((u, i) => {
      return (
        <tr key={'item-' + i}>
          <th key={'user-' + i}>
            <input
              type="text"
              value={u.name}
              onChange={(e) => handleOnEditName(u.id, e.target.value)}
            />
          </th>
          <th key={'bureau-' + i}>
            <input
              type="text"
              value={u.bureau}
              onChange={(e) => handleOnEditBureau(u.id, e.target.value)}
            />
          </th>
          {u.tasks.map((t, j) => {
            return (
              <td key={u.name + 'task-' + j}>
                <input
                  type="text"
                  value={t.task}
                  onChange={(e) =>
                    handleOnEditTask(u.id, t.time_id, e.target.value)
                  }
                />
              </td>
            )
          })}
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
