import useContract from '~/hooks/useContract'
import { getReasonFromError } from '~/lib/ethers-error-handler'

const CallSendForm = () => {
  const { getContract } = useContract()

  const call = async () => {
    const contract = await getContract()
    const response = await contract.test1().catch((error: Error) => {
      const reason = getReasonFromError(error, contract.interface)
      console.log(reason)
    })

    console.log({ call: response })
  }

  const send = async () => {
    const contract = await getContract()
    const response = await contract.setA(2).catch((error: Error) => {
      const reason = getReasonFromError(error, contract.interface)
      console.log(reason)
    })
    console.log({ sendA: response })
  }

  return (
    <div>
      <button onClick={call}>call</button>

      <button onClick={send}>send</button>
    </div>
  )
}

export default CallSendForm
