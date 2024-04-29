package com.example.sb_test.controllers;

import com.example.sb_test.forms.NewPinForm;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class NewPinFormController {

    @RequestMapping(path = "/newPin", method = RequestMethod.POST)
    public String formSubmission(@Validated @ModelAttribute final NewPinForm newPinForm) {
        log.info(newPinForm.toString());

        if ("TEST".equals(newPinForm.getLocName())){
            System.out.println("TEST SUCCESS");
        }

        return "redirect:index.html";
    }
}

