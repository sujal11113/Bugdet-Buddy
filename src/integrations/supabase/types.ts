export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      budget_goals: {
        Row: {
          category: string | null
          created_at: string
          custom_category_id: string | null
          end_date: string
          id: string
          is_active: boolean | null
          name: string
          period: string
          start_date: string
          target_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          custom_category_id?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          name: string
          period: string
          start_date: string
          target_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          custom_category_id?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          name?: string
          period?: string
          start_date?: string
          target_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_goals_custom_category_id_fkey"
            columns: ["custom_category_id"]
            isOneToOne: false
            referencedRelation: "custom_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_categories: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "custom_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_insights: {
        Row: {
          action_items: Json | null
          created_at: string
          description: string
          id: string
          insight_type: string
          is_read: boolean | null
          priority: string | null
          title: string
          user_id: string
          valid_until: string | null
        }
        Insert: {
          action_items?: Json | null
          created_at?: string
          description: string
          id?: string
          insight_type: string
          is_read?: boolean | null
          priority?: string | null
          title: string
          user_id: string
          valid_until?: string | null
        }
        Update: {
          action_items?: Json | null
          created_at?: string
          description?: string
          id?: string
          insight_type?: string
          is_read?: boolean | null
          priority?: string | null
          title?: string
          user_id?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          attachment: string | null
          category: Database["public"]["Enums"]["expense_category"]
          created_at: string
          date: string
          expense_name: string
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          attachment?: string | null
          category?: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          date?: string
          expense_name: string
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          attachment?: string | null
          category?: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          date?: string
          expense_name?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          created_at: string
          email: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          income: number | null
          name: string
          phone: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          email: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id: string
          income?: number | null
          name: string
          phone?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          income?: number | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      recurring_expenses: {
        Row: {
          amount: number
          auto_create: boolean | null
          category: string
          created_at: string
          custom_category_id: string | null
          expense_name: string
          frequency: string
          frequency_interval: number | null
          id: string
          is_active: boolean | null
          next_due_date: string
          reminder_days: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          auto_create?: boolean | null
          category: string
          created_at?: string
          custom_category_id?: string | null
          expense_name: string
          frequency: string
          frequency_interval?: number | null
          id?: string
          is_active?: boolean | null
          next_due_date: string
          reminder_days?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          auto_create?: boolean | null
          category?: string
          created_at?: string
          custom_category_id?: string | null
          expense_name?: string
          frequency?: string
          frequency_interval?: number | null
          id?: string
          is_active?: boolean | null
          next_due_date?: string
          reminder_days?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurring_expenses_custom_category_id_fkey"
            columns: ["custom_category_id"]
            isOneToOne: false
            referencedRelation: "custom_categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      expense_category:
        | "Food"
        | "Travel"
        | "Utilities"
        | "Entertainment"
        | "Healthcare"
        | "Shopping"
        | "Education"
        | "Other"
      gender_type: "male" | "female" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      expense_category: [
        "Food",
        "Travel",
        "Utilities",
        "Entertainment",
        "Healthcare",
        "Shopping",
        "Education",
        "Other",
      ],
      gender_type: ["male", "female", "other"],
    },
  },
} as const
