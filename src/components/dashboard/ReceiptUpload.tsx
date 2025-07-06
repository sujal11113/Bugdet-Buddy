
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Upload, FileUp, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ReceiptUploadProps {
  onUploadComplete?: (url: string) => void;
  expenseId?: string;
}

const ReceiptUpload: React.FC<ReceiptUploadProps> = ({ onUploadComplete, expenseId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!user) return;

    // Check file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 50MB",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('receipts')
        .getPublicUrl(fileName);

      if (expenseId) {
        // Update existing expense with receipt
        const { error: updateError } = await supabase
          .from('expenses')
          .update({ attachment: publicUrl })
          .eq('id', expenseId);

        if (updateError) throw updateError;
      }

      toast({
        title: "Success",
        description: "Receipt uploaded successfully!",
      });

      onUploadComplete?.(publicUrl);
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleTakePhoto = () => {
    cameraInputRef.current?.click();
  };

  const handleUploadFromGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-blue-300 hover:bg-blue-50">
          <Upload className="h-4 w-4 mr-2" />
          Upload Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle>Upload Receipt</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Button
            onClick={handleTakePhoto}
            disabled={uploading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Camera className="h-4 w-4 mr-2" />
            Take a Picture
          </Button>

          <Button
            onClick={handleUploadFromGallery}
            disabled={uploading}
            variant="outline"
            className="w-full border-blue-300 hover:bg-blue-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload from Gallery
          </Button>

          <Button
            onClick={handleUploadFromGallery}
            disabled={uploading}
            variant="outline"
            className="w-full border-blue-300 hover:bg-blue-50"
          >
            <FileUp className="h-4 w-4 mr-2" />
            Upload from Files
          </Button>

          {uploading && (
            <div className="text-center text-gray-600">
              Uploading... Please wait
            </div>
          )}
        </div>

        {/* Hidden file inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptUpload;
