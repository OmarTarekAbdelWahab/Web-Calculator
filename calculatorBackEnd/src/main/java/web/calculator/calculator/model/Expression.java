package web.calculator.calculator.model;

import jakarta.persistence.*;

import java.io.Serializable;
@Entity
public class Expression implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String calcExp;
    private double x;
    private double y;

    public Expression(){}

    public Expression(String calcExp, double x, double y){
        this.calcExp = calcExp;
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public String getExp() {
        return calcExp;
    }

    public void setExp(String calcExp) {
        this.calcExp = calcExp;
    }

    public String toString() {
        return "Op1: " + x + " " + "Fn: " + calcExp + " " + "Op2: " + y;
    }
}
