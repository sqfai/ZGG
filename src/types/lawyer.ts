// 律师专业领域枚举
export enum LawyerSpecialty {
  CIVIL = '民事',
  COMMERCIAL = '商事',
  CRIMINAL = '刑事',
  ADMINISTRATIVE = '行政',
  INTELLECTUAL_PROPERTY = '知识产权',
  DEBT_COLLECTION = '债权催收'
}

// 律师资质状态枚举
export enum LawyerStatus {
  PENDING = '待审核',
  APPROVED = '已认证',
  REJECTED = '未通过'
}

// 律师信息接口
export interface LawyerInfo {
  id: string
  name: string
  avatar?: string
  gender: '男' | '女'
  phone: string
  email: string
  licenseNumber: string // 执业证号
  firm: string // 所属律所
  location: string // 执业地区
  specialties: LawyerSpecialty[] // 专业领域
  experience: number // 执业年限
  description: string // 个人简介
  status: LawyerStatus // 认证状态
  createdAt: Date
  updatedAt: Date
}