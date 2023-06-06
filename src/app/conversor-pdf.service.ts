import { DOCUMENT } from '@angular/common';
import { ElementRef, Injectable } from '@angular/core';
import jsPDF from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class ConversorPDFService {
  contador: number = 0;

  convertirHTMLaPDF(anchoMarco: number, anchoContenido: number, nombrePDF: string, elemento: ElementRef) {
    const conversor = new jsPDF('p', 'px', 'a4');
  
    conversor.html(elemento.nativeElement, {
      callback: function (doc) {
        const totalPages = doc.getNumberOfPages();
        console.log('Número de páginas generadas:', totalPages);
  
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i);
          
          if (i !== 1) {
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(0, 0, doc.internal.pageSize.width, 50, 'F'); // Rectángulo blanco en la cabecera

            doc.setFontSize(10);
            
            doc.setTextColor(0, 0, 0);
            doc.text('Cód. Ref.',21, 40 );
            doc.text('Referencia',105, 40);
            doc.text('Números de Serie',263, 40);
            doc.text('Cantidad',390, 40 );
          }
  
          // doc.text(10, 100, 'Contenido de la página ' + i); // Ejemplo de texto en la posición y: 100
  
          // Resto del contenido de la página...
  
        }
  
        conversor.save(nombrePDF);
      },
      x: 10,
      y: -23,
      margin:[50,0,0,0],
      autoPaging:'text',
      width: anchoContenido,
      windowWidth: anchoMarco
    });
  }

  constructor() { }
}