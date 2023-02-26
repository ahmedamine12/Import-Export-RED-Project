package com.example.new_gestion_red.service.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

public class UpdateRedProductDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public class AddRedProductDto
    {

        private String num_Douan;

        private String RED;
        @JsonFormat(pattern="yyyy-MM-dd",shape = JsonFormat.Shape.STRING)
        private Date date_lancement;
       // private int time;

        private String designation;

        private String nameProject;
        private respoProjectDto respo ;
        private String jobId;

        private String jobGroup;

    }
}
