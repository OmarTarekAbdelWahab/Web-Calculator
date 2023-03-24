package web.calculator.calculator.service;

import org.springframework.stereotype.Service;
import web.calculator.calculator.model.Expression;

@Service
public class CalculatorService {

    private Expression expression = new Expression("PLUS", 0 , 0);


    public void setExpression(Expression expression) {
        this.expression = expression;
    }

    public Expression getExpression() {
        return this.expression;
    }

    public String getValue() {
        if(expression.getExp() == null){
            return "Error";
        }
        String operator = this.expression.getExp();
        double value = 0;
        switch (operator){
            case "+":
                value = this.expression.getX() + this.expression.getY();
                break;
            case "-":
                value = this.expression.getX() - this.expression.getY();
                break;
            case "*":
                value = this.expression.getX() * this.expression.getY();
                break;
            case "/":
                if(this.expression.getY() == 0.0){
                    return "Error";
                }
                value = this.expression.getX() / this.expression.getY();
                break;
            case "1/x":
                if(this.expression.getX() == 0.0){
                    return "Error";
                }
                value = 1.0 / this.expression.getX();
                break;
            case "^":
                value =  Math.pow(this.expression.getX(), 2.0);
                break;
            case "√x":
                value =  Math.sqrt(this.expression.getX());
                break;
            case "%":
                value =  this.expression.getX() / 100.0;
                break;
            default:
                return "Error";
        }
        return String.valueOf(value);

    }
}
