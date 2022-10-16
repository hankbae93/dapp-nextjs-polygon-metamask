import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

import { useIsMounted } from '~/hooks/useIsMounted'

const UserInfoBox = () => {
  const isMounted = useIsMounted()
  const session = useSession()
  const account = useAccount()

  if (!isMounted) return <></>

  return (
    <div>
      {account && (
        <div>
          <p style={{ padding: '5px' }}>
            metamask 연결 정보
            <br /> account: {account?.address} <br /> account.isConnected :{' '}
            {account?.isConnected}
          </p>
        </div>
      )}

      {session?.status === 'authenticated' ? (
        <div>
          <div>
            <p style={{ padding: '5px' }}>
              session 연결 정보 {session?.status}
            </p>
          </div>
        </div>
      ) : (
        '로그인이 필요합니다.'
      )}
    </div>
  )
}

export default UserInfoBox
