package web.calculator.calculator;


import org.springframework.web.bind.annotation.*;
import web.calculator.calculator.model.Expression;
import web.calculator.calculator.service.CalculatorService;

@RestController
public class CalculatorResource {
    private final CalculatorService calculatorService;

    public CalculatorResource(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @CrossOrigin("http://localhost:4200")
    @GetMapping("/exp")
    public String getValue(){
        return calculatorService.getValue();
    }

    @CrossOrigin("http://localhost:4200")
    @RequestMapping(method= RequestMethod.POST, value="/set")
    public void setExpression(@RequestBody Expression expression){
        calculatorService.setExpression(expression);
    }

}
