import { useEffect, useState } from 'react'
import {
  CellBase,
  Matrix,
  createEmptyMatrix,
  Spreadsheet,
} from 'react-spreadsheet'

import json from '../../assets/api.json'
type User = typeof json

/** テスト用のasync関数 */

const sleep = (m: number) => new Promise((_) => setTimeout(_, m))

const usersToMatrix = (user: User) => {
  const d: Matrix<CellBase> = createEmptyMatrix(
    user.time_count + 2,
    user.user_count,
  )

  user.users.map((u, i) =>
    u.tasks.map((task) => {
      d[0][i] = { value: u.name }
      d[1][i] = { value: u.bureau }
      d[task.time_id + 1][i] = { value: task.task }
    }),
  )

  return d
}

export const CreftPage = () => {
  const [data, setData] = useState<Matrix<CellBase>>(
    createEmptyMatrix<CellBase>(5, 5),
  )

  // 変更されちゃったらループしちゃうのでそれ用の変数を用意
  let unmounted = false

  useEffect(() => {
    /*
     useEffectで行うためにここで処理
     本当ならuseEffectより前のところ（描画前）で非同期を動かしたい
    */
    async function asyncFunc() {
      const waitTime = 10
      console.log(0)
      await sleep(waitTime)
      console.log(waitTime)

      const user: User = json

      const matrix = usersToMatrix(user)

      setData(matrix)
    }

    asyncFunc()
    unmounted = true
  }, [unmounted])

  const columnLabels = ['test', 'test#2', 'test#3', 'test#4']

  const rowLabels = ['名前', '局', '6:00', '7:00', '8:00', '9:00', '10:00']

  const handleOnChange = (e: Matrix<CellBase>) => {
    setData(e)
  }

  return (
    <Spreadsheet
      data={data}
      //      columnLabels={columnLabels}
      //      rowLabels={rowLabels}
      onChange={(e) => handleOnChange(e)}
    />
  )
}
