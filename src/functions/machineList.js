export default function machineList(response) {
  const machines = response.map((items) => {
    return items.report.machine
  })

  const uniqueMachineList = Array.from(
    new Set(
      machines.map(({ number }) => {
        const list = machines.find((item) => item.number === number).number
        return list
      })
    )
  )

  return uniqueMachineList
}
