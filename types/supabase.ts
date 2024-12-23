export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // 在这里添加你的数据库表定义
      // 例如：
      // profiles: {
      //   Row: {
      //     id: string
      //     name: string
      //     email: string
      //   }
      //   Insert: {
      //     id: string
      //     name: string
      //     email: string
      //   }
      //   Update: {
      //     id?: string
      //     name?: string
      //     email?: string
      //   }
      // }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
