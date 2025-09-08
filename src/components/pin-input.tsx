"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";

interface PinInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export function PinInput({ 
  length = 6, 
  value, 
  onChange, 
  onComplete, 
  disabled = false,
  error = false 
}: PinInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Ensure we have the right number of input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (index: number, inputValue: string) => {
    // Only allow digits
    const digit = inputValue.replace(/\D/g, "").slice(-1);
    
    const newValue = value.split('');
    newValue[index] = digit;
    
    // Fill array to correct length
    while (newValue.length < length) {
      newValue.push('');
    }
    
    const newPin = newValue.join('');
    onChange(newPin);

    // Auto-focus next input
    if (digit && index < length - 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Check if complete
    if (newPin.length === length && newPin.split('').every(d => d !== '')) {
      onComplete?.(newPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pastedData.padEnd(length, ''));
    
    if (pastedData.length === length) {
      onComplete?.(pastedData);
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          disabled={disabled}
          className={`w-11 h-12 text-center text-lg font-semibold ${
            error ? 'border-destructive' : ''
          } ${
            focusedIndex === index ? 'border-primary' : ''
          }`}
        />
      ))}
    </div>
  );
}