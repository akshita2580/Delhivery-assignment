'use client'

import { TaskAllocationPage } from '@/components/TaskAllocationPage'
import { Layout } from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function AllocateTask() {
  return (
    <ProtectedRoute>
      <Layout>
        <TaskAllocationPage />
      </Layout>
    </ProtectedRoute>
  )
}


