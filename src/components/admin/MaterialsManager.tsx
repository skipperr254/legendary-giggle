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
import { Plus, Edit, Trash2, Hammer, TreePine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import type { StyleMaterial, DesignStyle, MediaFile } from '@/lib/database';

const MaterialsManager: React.FC = () => {
  const [materials, setMaterials] = useState<StyleMaterial[]>([]);
  const [designStyles, setDesignStyles] = useState<DesignStyle[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMaterial, setEditingMaterial] = useState<StyleMaterial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    style_id: '',
    material_type: 'wood' as 'wood' | 'metal',
    material_name: '',
    image_id: '',
    description: '',
    sort_order: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchMaterials(),
        fetchDesignStyles(),
        fetchMediaFiles(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaterials = async () => {
    const { data, error } = await supabase
      .from('style_materials')
      .select(`
        *,
        style:style_id(id, name),
        image:image_id(id, filename)
      `)
      .order('material_type')
      .order('sort_order');

    if (error) throw error;
    setMaterials(data || []);
  };

  const fetchDesignStyles = async () => {
    const { data, error } = await supabase
      .from('design_styles')
      .select('id, name')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    setDesignStyles(data || []);
  };

  const fetchMediaFiles = async () => {
    const { data, error } = await supabase
      .from('media_files')
      .select('id, filename, file_type')
      .eq('file_type', 'image')
      .eq('is_active', true)
      .order('filename');

    if (error) throw error;
    setMediaFiles(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const materialData = {
        ...formData,
        image_id: formData.image_id || null,
      };

      if (editingMaterial) {
        const { error } = await supabase
          .from('style_materials')
          .update(materialData)
          .eq('id', editingMaterial.id);

        if (error) throw error;
        toast({ title: "Success", description: "Material updated successfully" });
      } else {
        const { error } = await supabase
          .from('style_materials')
          .insert([materialData]);

        if (error) throw error;
        toast({ title: "Success", description: "Material created successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchMaterials();
    } catch (error) {
      console.error('Error saving material:', error);
      toast({
        title: "Error",
        description: "Failed to save material",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (material: StyleMaterial) => {
    setEditingMaterial(material);
    setFormData({
      style_id: material.style_id,
      material_type: material.material_type,
      material_name: material.material_name,
      image_id: material.image?.id || '',
      description: material.description || '',
      sort_order: material.sort_order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this material?')) return;

    try {
      const { error } = await supabase
        .from('style_materials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Material deleted successfully" });
      fetchMaterials();
    } catch (error) {
      console.error('Error deleting material:', error);
      toast({
        title: "Error",
        description: "Failed to delete material",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setEditingMaterial(null);
    setFormData({
      style_id: '',
      material_type: 'wood',
      material_name: '',
      image_id: '',
      description: '',
      sort_order: 0,
    });
  };

  const getMaterialIcon = (type: string) => {
    return type === 'wood' ? <TreePine className="h-4 w-4" /> : <Hammer className="h-4 w-4" />;
  };

  if (loading) {
    return <div className="text-center py-8">Loading materials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Style Materials ({materials.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingMaterial ? 'Edit Material' : 'Add New Material'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="style_id">Design Style</Label>
                  <Select value={formData.style_id} onValueChange={(value) => setFormData({ ...formData, style_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {designStyles.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          {style.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="material_type">Material Type</Label>
                  <Select value={formData.material_type} onValueChange={(value: 'wood' | 'metal') => setFormData({ ...formData, material_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wood">Wood</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="material_name">Material Name</Label>
                <Input
                  id="material_name"
                  value={formData.material_name}
                  onChange={(e) => setFormData({ ...formData, material_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image_id">Image</Label>
                <Select value={formData.image_id} onValueChange={(value) => setFormData({ ...formData, image_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select image" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {mediaFiles.map((file) => (
                      <SelectItem key={file.id} value={file.id}>
                        {file.filename}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description of the material"
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
                  {editingMaterial ? 'Update' : 'Create'}
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
              <TableHead>Material</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Style</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getMaterialIcon(material.material_type)}
                    <div>
                      <div className="font-medium">{material.material_name}</div>
                      {material.description && (
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {material.description}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={material.material_type === 'wood' ? 'secondary' : 'outline'}>
                    {material.material_type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {material.style?.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  {material.image ? (
                    <Badge variant="secondary" className="text-xs">
                      {material.image.filename}
                    </Badge>
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </TableCell>
                <TableCell>{material.sort_order}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(material)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(material.id)}
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

export default MaterialsManager;