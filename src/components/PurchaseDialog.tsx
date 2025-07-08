import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Check, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { styleResults } from '@/data/styleResults';

interface PurchaseDialogProps {
  style: string;
  onPurchaseComplete: () => void;
  allResults?: boolean;
}

const PurchaseDialog: React.FC<PurchaseDialogProps> = ({ style, onPurchaseComplete, allResults = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handlePurchase = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing with 90% success rate
      await new Promise(resolve => setTimeout(resolve, 2000));
      const success = Math.random() > 0.1;
      
      if (success) {
        setIsProcessing(false);
        setIsOpen(false);
        onPurchaseComplete();
        toast({
          title: "Purchase Successful!",
          description: allResults ? "All personalized results are now downloading." : "Your personalized results are now downloading.",
        });
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  const buttonText = allResults ? "Download Master Guide ($9.99)" : "Download Your Guide ($4.99)";
  const dialogTitle = allResults ? "Download Master Guide" : "Download Your Guide";
  const resultCount = allResults ? Object.keys(styleResults).length : 1;
  const price = allResults ? "$9.99" : "$4.99";
  const description = allResults ? "Get the complete style match master guide to open your style to new possibilities." : "Get your in-depth style match guide to inspire you, on your design journey.";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold mb-2">
            <Download className="mr-2 h-5 w-5" />
            {buttonText}
          </Button>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            {description}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Check className="h-5 w-5 text-green-600" />
                <span>{allResults ? `Complete style guides for all ${resultCount} styles` : `Complete ${style} style guide`}</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <Check className="h-5 w-5 text-green-600" />
                <span>Detailed design recommendations</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <Check className="h-5 w-5 text-green-600" />
                <span>Color palette & material guide</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-600" />
                <span>PDF format for easy sharing</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isProcessing}
            />
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 mb-2">{price}</p>
            <p className="text-sm text-muted-foreground">One-time purchase</p>
          </div>
          
          <Button 
            onClick={handlePurchase} 
            disabled={isProcessing || !email}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            {isProcessing ? 'Processing...' : 'Purchase Now'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;