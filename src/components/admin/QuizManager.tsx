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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, HelpCircle, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import type { QuizQuestion, QuizOption, RoomType, DesignStyle, MediaFile } from '@/lib/database';

const QuizManager: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [designStyles, setDesignStyles] = useState<DesignStyle[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [questionFormData, setQuestionFormData] = useState({
    question_text: '',
    room_type_id: '',
    question_type: 'style_preference',
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
        fetchQuestions(),
        fetchRoomTypes(),
        fetchDesignStyles(),
        fetchMediaFiles(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select(`
        *,
        room_type:room_type_id(id, name),
        options:quiz_options(
          id,
          option_letter,
          option_text,
          sort_order,
          style:style_id(id, name),
          image:image_id(id, filename)
        )
      `)
      .order('sort_order');

    if (error) throw error;
    setQuestions(data || []);
  };

  const fetchRoomTypes = async () => {
    const { data, error } = await supabase
      .from('room_types')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw error;
    setRoomTypes(data || []);
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

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingQuestion) {
        const { error } = await supabase
          .from('quiz_questions')
          .update(questionFormData)
          .eq('id', editingQuestion.id);

        if (error) throw error;
        toast({ title: "Success", description: "Question updated successfully" });
      } else {
        const { error } = await supabase
          .from('quiz_questions')
          .insert([questionFormData]);

        if (error) throw error;
        toast({ title: "Success", description: "Question created successfully" });
      }

      setIsQuestionDialogOpen(false);
      resetQuestionForm();
      fetchQuestions();
    } catch (error) {
      console.error('Error saving question:', error);
      toast({
        title: "Error",
        description: "Failed to save question",
        variant: "destructive"
      });
    }
  };

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion(question);
    setQuestionFormData({
      question_text: question.question_text,
      room_type_id: question.room_type.id,
      question_type: question.question_type,
      sort_order: question.sort_order,
    });
    setIsQuestionDialogOpen(true);
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question and all its options?')) return;

    try {
      const { error } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Question deleted successfully" });
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "destructive"
      });
    }
  };

  const resetQuestionForm = () => {
    setEditingQuestion(null);
    setQuestionFormData({
      question_text: '',
      room_type_id: '',
      question_type: 'style_preference',
      sort_order: 0,
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading quiz data...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Quiz Questions ({questions.length})</h3>
            <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetQuestionForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingQuestion ? 'Edit Question' : 'Add New Question'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleQuestionSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="question_text">Question Text</Label>
                    <Textarea
                      id="question_text"
                      value={questionFormData.question_text}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, question_text: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="room_type_id">Room Type</Label>
                      <Select value={questionFormData.room_type_id} onValueChange={(value) => setQuestionFormData({ ...questionFormData, room_type_id: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map((room) => (
                            <SelectItem key={room.id} value={room.id}>
                              {room.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="question_type">Question Type</Label>
                      <Select value={questionFormData.question_type} onValueChange={(value) => setQuestionFormData({ ...questionFormData, question_type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="style_preference">Style Preference</SelectItem>
                          <SelectItem value="material_preference">Material Preference</SelectItem>
                          <SelectItem value="color_preference">Color Preference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sort_order">Sort Order</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={questionFormData.sort_order}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, sort_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsQuestionDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingQuestion ? 'Update' : 'Create'}
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
                  <TableHead>Question</TableHead>
                  <TableHead>Room Type</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Options</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <HelpCircle className="h-4 w-4" />
                        <div className="max-w-xs">
                          <div className="font-medium truncate">{question.question_text}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{question.room_type.name}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{question.question_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{question.options?.length || 0} options</Badge>
                    </TableCell>
                    <TableCell>{question.sort_order}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditQuestion(question)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteQuestion(question.id)}
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
        </TabsContent>

        <TabsContent value="options" className="space-y-4">
          <div className="text-center py-8 text-gray-500">
            <List className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Quiz options management coming soon...</p>
            <p className="text-sm">You can manage quiz options by editing individual questions above.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizManager;