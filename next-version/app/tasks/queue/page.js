'use client'

import { TaskQueuePage } from '@/components/TaskQueuePage'
import { Layout } from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function TaskQueue() {
  return (
    <ProtectedRoute>
      <Layout>
        <TaskQueuePage />
      </Layout>
    </ProtectedRoute>
  )
}


