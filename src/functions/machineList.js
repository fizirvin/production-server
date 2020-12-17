export default function machineList(response) {
  const machines = response.map((items) => {
    return items.report.machine
  })

  const uniqueMachineList = Array.from(
    new Set(
      machines.map(({ _id }) => {
        const list = machines.find((item) => item._id === _id)
        return list
      })
    )
  )

  return uniqueMachineList
}
