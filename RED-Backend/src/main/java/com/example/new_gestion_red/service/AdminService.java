package com.example.new_gestion_red.service;

import com.example.new_gestion_red.model.Admin;
import com.example.new_gestion_red.repository.AdminRepositry;
import com.example.new_gestion_red.service.DTO.AdminDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminService {
    @Autowired
    private AdminRepositry adminRepositry ;
    public String login(AdminDTO adminDTO)
    {
        String email ;
        String password ;

        Admin admin = adminRepositry.findByEmail(adminDTO.getEmail());
        if(admin!=null)
        {

            if(admin.getPassword().equals(adminDTO.getPassword()))
            {
                return "Success";
            }
            else
                return "passF";
        }
        else return "emailF";
    }

}
