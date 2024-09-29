import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  profileCompleted: boolean;
  lawFirm?: string;
  barAssociationId?: string;
  specialization?: string;
  phoneNumber?: string;
}

interface ProfileCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<User>) => void;
  initialData: User;
}

const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<User>>({
    lawFirm: '',
    barAssociationId: '',
    specialization: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        lawFirm: initialData.lawFirm || '',
        barAssociationId: initialData.barAssociationId || '',
        specialization: initialData.specialization || '',
        phoneNumber: initialData.phoneNumber || '',
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return !!formData.lawFirm;
      case 2:
        return !!formData.barAssociationId;
      case 3:
        return !!formData.specialization;
      case 4:
        return !!formData.phoneNumber;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please provide additional information to complete your profile. Step {step} of 4.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {step === 1 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lawFirm" className="text-right">
                Law Firm
              </Label>
              <Input
                id="lawFirm"
                name="lawFirm"
                value={formData.lawFirm}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          )}
          {step === 2 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="barAssociationId" className="text-right">
                Bar ID
              </Label>
              <Input
                id="barAssociationId"
                name="barAssociationId"
                value={formData.barAssociationId}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          )}
          {step === 3 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialization" className="text-right">
                Specialization
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange(value, 'specialization')}
                value={formData.specialization}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate">Corporate Law</SelectItem>
                  <SelectItem value="criminal">Criminal Law</SelectItem>
                  <SelectItem value="family">Family Law</SelectItem>
                  <SelectItem value="intellectual">Intellectual Property</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {step === 4 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          {step > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step < 4 ? (
            <Button onClick={handleNext} disabled={!isStepComplete()}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!isStepComplete()}>
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCompletionModal;
