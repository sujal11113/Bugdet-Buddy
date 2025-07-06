
-- Update the receipts bucket policies to allow proper file operations
CREATE POLICY "Authenticated users can upload receipts" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'receipts' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Authenticated users can view their receipts" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'receipts' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Authenticated users can delete their receipts" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'receipts' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Enable realtime for expenses table to auto-refresh data
ALTER TABLE public.expenses REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
