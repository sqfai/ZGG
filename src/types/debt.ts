// 债权处理方式枚举
export enum DebtProcessingMethod {
  LEGAL_FORCE = 'LEGAL_FORCE',
  BOUNTY = 'BOUNTY'
}

// 债权信息接口定义
export interface DebtInfo {
  debtorName: string
  amount: number
  dueDate: Date
  description: string
  processingMethod?: DebtProcessingMethod
  createdAt: Date
  updatedAt: Date
}