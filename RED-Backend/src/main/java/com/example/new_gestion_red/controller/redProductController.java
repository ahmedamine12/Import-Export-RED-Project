package com.example.new_gestion_red.controller;

import com.example.new_gestion_red.model.RedProduct;
import com.example.new_gestion_red.model.ScheduleEmailResponse;
import com.example.new_gestion_red.repository.RedProductRepositry;
import com.example.new_gestion_red.repository.RespoProjectRepositry;
import com.example.new_gestion_red.service.DTO.AddRedProductDto;
import com.example.new_gestion_red.service.DTO.redProductDto;
import com.example.new_gestion_red.service.redProductService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
// pour lier le frontend avec backend
@CrossOrigin("http://localhost:3000")
public class redProductController {

    private RedProductRepositry redProductRepositry;

    private RespoProjectRepositry respoProjectRepositry;
    private redProductService productService;


    @GetMapping("/redProducts")
    List<redProductDto> getRedProducts() {

        return productService.getAllRedProduct();
    }

    @GetMapping("/getredProduct/{id}")
    redProductDto getRedProductbyId(@PathVariable Long id)
    {

        return productService.getRedProductById(id);
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/redProduct/{id}")
    public String createRedProduct(@PathVariable("id") Long id, @RequestBody AddRedProductDto newRedProduct) {

        return  productService.createRedProduct(newRedProduct, id);

    }

    @PutMapping("/UpdateRedProduct/{id_redpro}/{id_respo}")
    public String updateRedProduct(@RequestBody AddRedProductDto newProduct, @PathVariable Long id_redpro,
                                                  @PathVariable Long id_respo) {

        ScheduleEmailResponse response= productService.updateRedProduct(newProduct,id_redpro,id_respo);
        if(response.isSuccess())
        {
            return "success";
        }

       return response.getMessage();

    }

    @DeleteMapping("/deleteRedProduct/{id}")
    public void deleteRedProduct(@PathVariable Long id) {

        if (!redProductRepositry.existsById(id))
            return;
        RedProduct pro = redProductRepositry.findById(id).orElse(null);
        productService.delteJob_Trigger(id);
        redProductRepositry.deleteById(id);
    }
    @GetMapping("/pass_Data_to_excel")
    public void exportCustomersAndOrdersToExcel(HttpServletResponse response) throws Exception {
        List<redProductDto> products = getRedProducts();

        // Create a new workbook and sheet
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Gestion Red");

        // Create the header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue(" Numero Douane");
        headerRow.createCell(1).setCellValue(" RED");
        headerRow.createCell(2).setCellValue("Nom du produit");
        headerRow.createCell(3).setCellValue("Nom du projet");
        headerRow.createCell(4).setCellValue("Date de lancement");
        headerRow.createCell(6).setCellValue("Date d'echeance");
        headerRow.createCell(6).setCellValue("pays");
        headerRow.createCell(6).setCellValue("facture_export");
        headerRow.createCell(6).setCellValue("valeur_declarer");
        headerRow.createCell(6).setCellValue("valeur_non_decharger");
        headerRow.createCell(5).setCellValue("Responsable");
        headerRow.createCell(6).setCellValue("Email");

        // Create the data rows
        int rowNumber = 1;
        for (redProductDto product : products)
        {
                Row row = sheet.createRow(rowNumber++);
            row.createCell(0).setCellValue(product.getNum_Douan());
                row.createCell(1).setCellValue(product.getRED());
                row.createCell(2).setCellValue(product.getDesignation());
                row.createCell(3).setCellValue(product.getNameProject());
                row.createCell(4).setCellValue(product.getDate_lancement().toString());
            row.createCell(5).setCellValue(product.getDate_echeance().toString());
            row.createCell(6).setCellValue(product.getPays());
            row.createCell(7).setCellValue(product.getFacture_export());
            row.createCell(8).setCellValue(product.getValeur_declarer());
            row.createCell(9).setCellValue(product.getValeur_non_decharger());
            row.createCell(10).setCellValue(product.getRespo().getFull_name());
            row.createCell(11).setCellValue(product.getRespo().getEmail());

            }


        // Set the response headers and write the workbook to the response output stream
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment; filename=REDProductDATA.xlsx");
        workbook.write(response.getOutputStream());
        workbook.close();


    }





}
