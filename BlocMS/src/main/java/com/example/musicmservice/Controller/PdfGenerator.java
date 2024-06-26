package com.example.musicmservice.Controller;


import com.example.musicmservice.Entities.Bloc;
import com.example.musicmservice.Repository.BlocRepo;
import com.example.musicmservice.Service.ExcelGenerator;
import com.example.musicmservice.Service.PDFGeneratorService;
import com.lowagie.text.DocumentException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller

@RequestMapping("")
public class PdfGenerator {
    private final PDFGeneratorService pdfGeneratorService;
    private final BlocRepo blocRepo;
    public PdfGenerator(PDFGeneratorService pdfGeneratorService,BlocRepo blocRepo) {
        this.pdfGeneratorService = pdfGeneratorService;

        this.blocRepo=blocRepo;
    }
    @GetMapping("/export/pdf")
    public void exportToPDF(HttpServletResponse response) {
        try {
            response.setContentType("application/pdf");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());

            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=blocs" + currentDateTime + ".pdf";
            response.setHeader(headerKey, headerValue);

            this.pdfGeneratorService.export(response);
        } catch (IOException | DocumentException e) {
            e.printStackTrace(); // Log the exception or handle it appropriately
        }
    }
    @GetMapping("/export-to-excel")
    public void exportIntoExcelFile(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=blocs" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<Bloc> etudiantList = (List<Bloc>) blocRepo.findAll();
        ExcelGenerator generator = new ExcelGenerator(etudiantList);
        generator.generateExcelFile(response);
    }

}
