'use client'

import { BotStatusPage } from '@/components/BotStatusPage'
import { Layout } from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function Bots() {
  return (
    <ProtectedRoute>
      <Layout>
        <BotStatusPage />
      </Layout>
    </ProtectedRoute>
  )
}


