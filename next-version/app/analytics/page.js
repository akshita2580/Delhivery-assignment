'use client'

import { AnalyticsPage } from '@/components/AnalyticsPage'
import { Layout } from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function Analytics() {
  return (
    <ProtectedRoute>
      <Layout>
        <AnalyticsPage />
      </Layout>
    </ProtectedRoute>
  )
}


