import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RotateCcw, Settings } from 'lucide-react';
import { SpacingSettings } from '@/types';

interface SpacingControlsProps {
  spacing: SpacingSettings;
  onChange: (spacing: SpacingSettings) => void;
}

const defaultSpacing: SpacingSettings = {
  pageMargin: 20,
  sectionSpacing: 8,
  lineSpacing: 1.2,
  bulletSpacing: 4,
  headerSpacing: 6,
};

export default function SpacingControls({ spacing, onChange }: SpacingControlsProps) {
  const handleChange = (field: keyof SpacingSettings, value: number) => {
    onChange({
      ...spacing,
      [field]: value,
    });
  };

  const resetToDefault = () => {
    onChange(defaultSpacing);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Spacing Controls</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetToDefault}
          className="gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        {/* Page Margin */}
        <div className="space-y-2">
          <Label htmlFor="pageMargin" className="text-xs">
            Page Margin (mm)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="pageMargin"
              type="number"
              min="10"
              max="40"
              step="1"
              value={spacing.pageMargin}
              onChange={(e) => handleChange('pageMargin', Number(e.target.value))}
              className="h-8 text-xs"
            />
            <span className="text-xs text-gray-500">10-40mm</span>
          </div>
        </div>

        {/* Section Spacing */}
        <div className="space-y-2">
          <Label htmlFor="sectionSpacing" className="text-xs">
            Section Spacing (mm)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="sectionSpacing"
              type="number"
              min="4"
              max="20"
              step="1"
              value={spacing.sectionSpacing}
              onChange={(e) => handleChange('sectionSpacing', Number(e.target.value))}
              className="h-8 text-xs"
            />
            <span className="text-xs text-gray-500">4-20mm</span>
          </div>
        </div>

        {/* Line Spacing */}
        <div className="space-y-2">
          <Label htmlFor="lineSpacing" className="text-xs">
            Line Spacing
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="lineSpacing"
              type="number"
              min="1.0"
              max="2.0"
              step="0.1"
              value={spacing.lineSpacing}
              onChange={(e) => handleChange('lineSpacing', Number(e.target.value))}
              className="h-8 text-xs"
            />
            <span className="text-xs text-gray-500">1.0-2.0x</span>
          </div>
        </div>

        {/* Bullet Spacing */}
        <div className="space-y-2">
          <Label htmlFor="bulletSpacing" className="text-xs">
            Bullet Spacing (mm)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="bulletSpacing"
              type="number"
              min="2"
              max="10"
              step="1"
              value={spacing.bulletSpacing}
              onChange={(e) => handleChange('bulletSpacing', Number(e.target.value))}
              className="h-8 text-xs"
            />
            <span className="text-xs text-gray-500">2-10mm</span>
          </div>
        </div>

        {/* Header Spacing */}
        <div className="space-y-2">
          <Label htmlFor="headerSpacing" className="text-xs">
            Header Spacing (mm)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="headerSpacing"
              type="number"
              min="3"
              max="15"
              step="1"
              value={spacing.headerSpacing}
              onChange={(e) => handleChange('headerSpacing', Number(e.target.value))}
              className="h-8 text-xs"
            />
            <span className="text-xs text-gray-500">3-15mm</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
        <strong>Tip:</strong> Adjust spacing to fit more content or improve readability. Changes apply to all templates.
      </div>
    </Card>
  );
}
