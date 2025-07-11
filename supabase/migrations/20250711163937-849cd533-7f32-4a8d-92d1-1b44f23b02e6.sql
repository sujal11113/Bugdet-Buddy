-- Create custom categories table
CREATE TABLE public.custom_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '📁',
  color TEXT DEFAULT '#6366f1',
  parent_id UUID REFERENCES public.custom_categories(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recurring expenses table
CREATE TABLE public.recurring_expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  expense_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  category TEXT NOT NULL,
  custom_category_id UUID REFERENCES public.custom_categories(id) ON DELETE SET NULL,
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly', 'yearly', 'custom')),
  frequency_interval INTEGER DEFAULT 1,
  next_due_date DATE NOT NULL,
  reminder_days INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  auto_create BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create budget goals table
CREATE TABLE public.budget_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  custom_category_id UUID REFERENCES public.custom_categories(id) ON DELETE SET NULL,
  target_amount NUMERIC NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('weekly', 'monthly', 'yearly')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expense insights table for AI-generated insights
CREATE TABLE public.expense_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  insight_type TEXT NOT NULL CHECK (insight_type IN ('budget_suggestion', 'cost_cutting', 'spending_pattern', 'anomaly_detection')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  action_items JSONB DEFAULT '[]',
  is_read BOOLEAN DEFAULT false,
  valid_until DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.custom_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recurring_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_insights ENABLE ROW LEVEL SECURITY;

-- Create policies for custom_categories
CREATE POLICY "Users can view their own categories" 
ON public.custom_categories 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own categories" 
ON public.custom_categories 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories" 
ON public.custom_categories 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories" 
ON public.custom_categories 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for recurring_expenses
CREATE POLICY "Users can view their own recurring expenses" 
ON public.recurring_expenses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recurring expenses" 
ON public.recurring_expenses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recurring expenses" 
ON public.recurring_expenses 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recurring expenses" 
ON public.recurring_expenses 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for budget_goals
CREATE POLICY "Users can view their own budget goals" 
ON public.budget_goals 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own budget goals" 
ON public.budget_goals 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own budget goals" 
ON public.budget_goals 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own budget goals" 
ON public.budget_goals 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for expense_insights
CREATE POLICY "Users can view their own insights" 
ON public.expense_insights 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own insights" 
ON public.expense_insights 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own insights" 
ON public.expense_insights 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own insights" 
ON public.expense_insights 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_custom_categories_updated_at
BEFORE UPDATE ON public.custom_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recurring_expenses_updated_at
BEFORE UPDATE ON public.recurring_expenses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_budget_goals_updated_at
BEFORE UPDATE ON public.budget_goals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for new tables
ALTER TABLE public.custom_categories REPLICA IDENTITY FULL;
ALTER TABLE public.recurring_expenses REPLICA IDENTITY FULL;
ALTER TABLE public.budget_goals REPLICA IDENTITY FULL;
ALTER TABLE public.expense_insights REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.custom_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.recurring_expenses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.budget_goals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.expense_insights;