import React, { useState } from 'react';
import { MultiAgentVisualizer } from '../../components/ai-coordinator/MultiAgentVisualizer';
import { Bot, Sparkles, Send, Mic, Play } from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';

export const AICoordinatorPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <MultiAgentVisualizer />
    </div>
  );
};
