package com.example.musicmservice.Service;


import com.ctc.wstx.shaded.msv_core.verifier.psvi.TypeDetector;
import com.example.musicmservice.Entities.Bloc;
import com.example.musicmservice.Repository.BlocRepo;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.stereotype.Component;


import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.util.List;


@Component
public class PDFGeneratorService {
    @Autowired
    private BlocRepo blocRepo;

    public void export(HttpServletResponse response) throws DocumentException, IOException {
        com.lowagie.text.Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        // Add Logo
        com.lowagie.text.Image jpg = com.lowagie.text.Image.getInstance("Logo_ESPRIT_Ariana.jpg");
        jpg.scalePercent(5);
        jpg.setAlignment(com.lowagie.text.Image.ALIGN_TOP);
        document.add(jpg);

        // Add Title
        com.lowagie.text.Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, Color.PINK);
        Paragraph title = new Paragraph("Liste des blocs", titleFont);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        // Add Empty Line
        document.add(Chunk.NEWLINE);

        // Add Table Header
        PdfPTable table = new PdfPTable(3); // Number of columns
        table.setWidthPercentage(100);
        writeTableHeader(table);

        // Add Table Data
        writeTableData(table);

        // Add Table to Document
        document.add(table);

        // Add Signature
        com.lowagie.text.Font signatureFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 12);
        Paragraph signature = new Paragraph("Signature", signatureFont);
        signature.setAlignment(Paragraph.ALIGN_RIGHT);
        document.add(signature);

        document.close();
    }

    private void writeTableHeader(PdfPTable table) {
        com.lowagie.text.Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, Color.WHITE);
        PdfPCell cell = new PdfPCell();

        cell.setBackgroundColor(Color.GRAY);
        cell.setPadding(7);

        cell.setPhrase(new Phrase("ID", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Nom", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Capacité", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
        java.util.List<Bloc> blocs = (List<Bloc>) blocRepo.findAll();
        Font font = FontFactory.getFont(FontFactory.HELVETICA, 12);

        for (Bloc b : blocs) {
            table.addCell(new Phrase(String.valueOf(b.getId()), font));
            table.addCell(new Phrase(String.valueOf(b.getNom()), font));
            table.addCell(new Phrase(String.valueOf(b.getCapacite()), font));
        }
    }

}

