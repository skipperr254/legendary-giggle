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
import { Plus, Edit, Trash2, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import type { DesignStyle, MediaFile } from '@/lib/database';

const DesignStylesManager: React.FC = () => {
  const [styles, setStyles] = useState<DesignStyle[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStyle, setEditingStyle] = useState<DesignStyle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    characteristics: '',
    design_tips: '',
    color_palette: '',
    hero_image_id: '',
    video_id: '',
    pdf_guide_id: '',
    sort_order: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchStyles();
    fetchMediaFiles();
  }, []);

  const fetchStyles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('design_styles')
        .select(`
          *,
          hero_image:hero_image_id(id, filename),
          video:video_id(id, filename),
          pdf_guide:pdf_guide_id(id, filename)
        `)
        .order('sort_order');

      if (error) throw error;
      setStyles(data || []);
    } catch (error) {
      console.error('Error fetching styles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch design styles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMediaFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('media_files')
        .select('id, filename, file_type')
        .eq('is_active', true)
        .order('filename');

      if (error) throw error;
      setMediaFiles(data || []);
    } catch (error) {
      console.error('Error fetching media files:', error);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const styleData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.name),
        characteristics: formData.characteristics.split('\n').filter(item => item.trim()),
        design_tips: formData.design_tips.split('\n').filter(item => item.trim()),
        color_palette: formData.color_palette.split('\n').filter(item => item.trim()),
        hero_image_id: formData.hero_image_id || null,
        video_id: formData.video_id || null,
        pdf_guide_id: formData.pdf_guide_id || null,
      };

      if (editingStyle) {
        const { error } = await supabase
          .from('design_styles')
          .update(styleData)
          .eq('id', editingStyle.id);

        if (error) throw error;
        toast({ title: "Success", description: "Design style updated successfully" });
      } else {
        const { error } = await supabase
          .from('design_styles')
          .insert([styleData]);

        if (error) throw error;
        toast({ title: "Success", description: "Design style created successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchStyles();
    } catch (error) {
      console.error('Error saving style:', error);
      toast({
        title: "Error",
        description: "Failed to save design style",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (style: DesignStyle) => {
    setEditingStyle(style);
    setFormData({
      name: style.name,
      slug: style.slug,
      description: style.description,
      characteristics: style.characteristics.join('\n'),
      design_tips: style.design_tips.join('\n'),
      color_palette: style.color_palette.join('\n'),
      hero_image_id: style.hero_image?.id || '',
      video_id: style.video?.id || '',
      pdf_guide_id: style.pdf_guide?.id || '',
      sort_order: style.sort_order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this design style?')) return;

    try {
      const { error } = await supabase
        .from('design_styles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Design style deleted successfully" });
      fetchStyles();
    } catch (error) {
      console.error('Error deleting style:', error);
      toast({
        title: "Error",
        description: "Failed to delete design style",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setEditingStyle(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      characteristics: '',
      design_tips: '',
      color_palette: '',
      hero_image_id: '',
      video_id: '',
      pdf_guide_id: '',
      sort_order: 0,
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading design styles...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Design Styles ({styles.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Design Style
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingStyle ? 'Edit Design Style' : 'Add New Design Style'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      name: e.target.value,
                      slug: generateSlug(e.target.value)
                    })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="hero_image_id">Hero Image</Label>
                  <Select value={formData.hero_image_id} onValueChange={(value) => setFormData({ ...formData, hero_image_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select image" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mediaFiles.filter(f => f.file_type === 'image').map((file) => (
                        <SelectItem key={file.id} value={file.id}>
                          {file.filename}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="video_id">Video</Label>
                  <Select value={formData.video_id} onValueChange={(value) => setFormData({ ...formData, video_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select video" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mediaFiles.filter(f => f.file_type === 'video').map((file) => (
                        <SelectItem key={file.id} value={file.id}>
                          {file.filename}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pdf_guide_id">PDF Guide</Label>
                  <Select value={formData.pdf_guide_id} onValueChange={(value) => setFormData({ ...formData, pdf_guide_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select PDF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mediaFiles.filter(f => f.file_type === 'pdf').map((file) => (
                        <SelectItem key={file.id} value={file.id}>
                          {file.filename}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="characteristics">Characteristics (one per line)</Label>
                <Textarea
                  id="characteristics"
                  value={formData.characteristics}
                  onChange={(e) => setFormData({ ...formData, characteristics: e.target.value })}
                  rows={4}
                  placeholder="Natural Materials&#10;Clean Lines&#10;Neutral Palette"
                />
              </div>

              <div>
                <Label htmlFor="design_tips">Design Tips (one per line)</Label>
                <Textarea
                  id="design_tips"
                  value={formData.design_tips}
                  onChange={(e) => setFormData({ ...formData, design_tips: e.target.value })}
                  rows={4}
                  placeholder="Choose furniture with clean lines&#10;Keep surfaces clutter-free"
                />
              </div>

              <div>
                <Label htmlFor="color_palette">Color Palette (one per line)</Label>
                <Textarea
                  id="color_palette"
                  value={formData.color_palette}
                  onChange={(e) => setFormData({ ...formData, color_palette: e.target.value })}
                  rows={3}
                  placeholder="Warm White&#10;Soft Beige&#10;Charcoal Gray"
                />
              </div>

              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingStyle ? 'Update' : 'Create'}
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
              <TableHead>Style</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Media</TableHead>
              <TableHead>Colors</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {styles.map((style) => (
              <TableRow key={style.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Palette className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{style.name}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {style.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-mono">{style.slug}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    {style.hero_image && (
                      <Badge variant="secondary" className="text-xs">IMG</Badge>
                    )}
                    {style.video && (
                      <Badge variant="secondary" className="text-xs">VID</Badge>
                    )}
                    {style.pdf_guide && (
                      <Badge variant="secondary" className="text-xs">PDF</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {style.color_palette.slice(0, 3).map((color, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                    {style.color_palette.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{style.color_palette.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{style.sort_order}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(style)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(style.id)}
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

export default DesignStylesManager;