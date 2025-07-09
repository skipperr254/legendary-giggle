import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Image, Video, FileText, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import type { MediaFile } from '@/lib/database';

const MediaFilesManager: React.FC = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    filename: '',
    original_filename: '',
    file_path: '',
    bucket_name: 'styledmyhome.images',
    file_type: 'image' as 'image' | 'video' | 'pdf',
    mime_type: '',
    alt_text: '',
    description: '',
    tags: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaFiles(data || []);
    } catch (error) {
      console.error('Error fetching media files:', error);
      toast({
        title: "Error",
        description: "Failed to fetch media files",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const mediaData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      };

      if (editingFile) {
        const { error } = await supabase
          .from('media_files')
          .update(mediaData)
          .eq('id', editingFile.id);

        if (error) throw error;
        toast({ title: "Success", description: "Media file updated successfully" });
      } else {
        const { error } = await supabase
          .from('media_files')
          .insert([mediaData]);

        if (error) throw error;
        toast({ title: "Success", description: "Media file created successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchMediaFiles();
    } catch (error) {
      console.error('Error saving media file:', error);
      toast({
        title: "Error",
        description: "Failed to save media file",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (file: MediaFile) => {
    setEditingFile(file);
    setFormData({
      filename: file.filename,
      original_filename: file.original_filename,
      file_path: file.file_path,
      bucket_name: file.bucket_name,
      file_type: file.file_type,
      mime_type: file.mime_type,
      alt_text: file.alt_text || '',
      description: file.description || '',
      tags: file.tags?.join(', ') || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;

    try {
      const { error } = await supabase
        .from('media_files')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Media file deleted successfully" });
      fetchMediaFiles();
    } catch (error) {
      console.error('Error deleting media file:', error);
      toast({
        title: "Error",
        description: "Failed to delete media file",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setEditingFile(null);
    setFormData({
      filename: '',
      original_filename: '',
      file_path: '',
      bucket_name: 'styledmyhome.images',
      file_type: 'image',
      mime_type: '',
      alt_text: '',
      description: '',
      tags: '',
    });
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading media files...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Media Files ({mediaFiles.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Media File
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingFile ? 'Edit Media File' : 'Add New Media File'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="filename">Filename</Label>
                  <Input
                    id="filename"
                    value={formData.filename}
                    onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="original_filename">Original Filename</Label>
                  <Input
                    id="original_filename"
                    value={formData.original_filename}
                    onChange={(e) => setFormData({ ...formData, original_filename: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="file_path">File Path</Label>
                <Input
                  id="file_path"
                  value={formData.file_path}
                  onChange={(e) => setFormData({ ...formData, file_path: e.target.value })}
                  placeholder="e.g., Kitchen Images/Modern Kitchen.png"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bucket_name">Bucket Name</Label>
                  <Select value={formData.bucket_name} onValueChange={(value) => setFormData({ ...formData, bucket_name: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="styledmyhome.images">styledmyhome.images</SelectItem>
                      <SelectItem value="styledmyhome.videos">styledmyhome.videos</SelectItem>
                      <SelectItem value="styledmyhome.pdfs">styledmyhome.pdfs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="file_type">File Type</Label>
                  <Select value={formData.file_type} onValueChange={(value: 'image' | 'video' | 'pdf') => setFormData({ ...formData, file_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="mime_type">MIME Type</Label>
                <Input
                  id="mime_type"
                  value={formData.mime_type}
                  onChange={(e) => setFormData({ ...formData, mime_type: e.target.value })}
                  placeholder="e.g., image/png, video/mp4, application/pdf"
                  required
                />
              </div>

              <div>
                <Label htmlFor="alt_text">Alt Text</Label>
                <Input
                  id="alt_text"
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Descriptive text for accessibility"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the media file"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="kitchen, modern, farmhouse"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingFile ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Bucket</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mediaFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getFileIcon(file.file_type)}
                    <div>
                      <div className="font-medium">{file.filename}</div>
                      <div className="text-sm text-gray-500">{file.original_filename}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {file.file_type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{file.bucket_name}</TableCell>
                <TableCell className="text-sm max-w-xs truncate">{file.file_path}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {file.tags?.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {file.tags && file.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{file.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(file)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MediaFilesManager;