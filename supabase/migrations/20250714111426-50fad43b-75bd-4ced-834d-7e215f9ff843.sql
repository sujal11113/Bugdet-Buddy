-- Create trigger to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, name, email, age, gender)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'name', ''), 
    NEW.email,
    CASE 
      WHEN NEW.raw_user_meta_data->>'age' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'age')::integer 
      ELSE NULL 
    END,
    CASE 
      WHEN NEW.raw_user_meta_data->>'gender' IN ('male', 'female', 'other') 
      THEN (NEW.raw_user_meta_data->>'gender')::gender_type 
      ELSE NULL 
    END
  );
  RETURN NEW;
END;
$function$;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();