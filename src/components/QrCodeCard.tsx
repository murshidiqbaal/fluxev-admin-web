import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from './ui/button';
import { Download, Printer } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface QrCodeCardProps {
  value: string;
  title?: string;
  subtitle?: string;
  size?: number;
}

export const QrCodeCard: React.FC<QrCodeCardProps> = ({ 
  value, 
  title = "Connector QR Code", 
  subtitle,
  size = 200 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${title.replace(/\s+/g, '_').toLowerCase()}_qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const printQR = () => {
    const content = canvasRef.current;
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const canvas = content.querySelector('canvas') as HTMLCanvasElement;
    const dataUrl = canvas.toDataURL();

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
            img { width: 300px; height: 300px; }
            h1 { margin-bottom: 20px; color: #333; }
            p { color: #666; margin-top: 10px; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <h1>${title}</h1>
          <img src="${dataUrl}" />
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden border-primary/20 bg-black/40 backdrop-blur-xl text-white shadow-[0_0_20px_rgba(0,255,255,0.1)]">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-bold tracking-tight text-cyan-400">
          {title}
        </CardTitle>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">
            {subtitle}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-transparent to-primary/5" ref={canvasRef}>
        <div className="p-4 bg-white rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          <QRCodeCanvas
            value={value}
            size={size}
            level="H"
            includeMargin={true}
          />
        </div>
        <p className="mt-4 text-[10px] font-mono text-cyan-500/50 break-all max-w-[200px] text-center">
          {value}
        </p>
      </CardContent>

      <CardFooter className="flex gap-3 pt-2">
        <Button 
          variant="outline" 
          className="flex-1 border-primary/20 hover:bg-primary/10 hover:text-cyan-400"
          onClick={downloadQR}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 border-primary/20 hover:bg-primary/10 hover:text-cyan-400"
          onClick={printQR}
        >
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
      </CardFooter>
    </Card>
  );
};
