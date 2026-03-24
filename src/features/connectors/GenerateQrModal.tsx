// import React from 'react';
import { QrCodeCard } from '@/components/QrCodeCard';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface GenerateQrModalProps {
  connector: {
    connector_id: string;
    stations?: { name: string };
    connector_type: string;
    max_power_kw: number;
  };
  onClose: () => void;
}


export default function GenerateQrModal({ connector, onClose }: GenerateQrModalProps) {
  const qrValue = `fluxev://start?connector_id=${connector.connector_id}`;
  const subtitle = `${connector.stations?.name || 'Station'} - ${connector.connector_type.toUpperCase()} ${connector.max_power_kw}kW`;


  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-white hover:bg-white/10"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        <QrCodeCard
          value={qrValue}
          title="FluxEV Connector QR"
          subtitle={subtitle}
        />

        <p className="text-center text-xs text-muted-foreground mt-4 px-4 leading-relaxed">
          Scan this QR code using the FluxEV mobile app to start a charging session for this connector.
        </p>
      </div>
    </div>
  );
}
