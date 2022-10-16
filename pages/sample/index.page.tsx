import { NextPage } from 'next'
import React from 'react'


import TestBlockChain from './src/test-block-chain'

const SamplePage: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '100px',
        width: '100%'
      }}
    >
      <TestBlockChain />

    </div>
  )
}

export default SamplePage
