'use client'

import { MapPage } from '@/components/MapPage'
import { Layout } from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function Map() {
  return (
    <ProtectedRoute>
      <Layout>
        <MapPage />
      </Layout>
    </ProtectedRoute>
  )
}


