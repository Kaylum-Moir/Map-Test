package com.example.sb_test.forms;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewPinForm {

    @NotEmpty
    private String locName;

    @NotEmpty
    private String openTimes;
}
