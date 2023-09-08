import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Product } from "../models/product.model";

export class TypeUtil {

    static isADateStruct(obj: any): obj is NgbDateStruct {
        if (typeof obj != 'object') return false;
        return 'year' in obj && 'month' in obj && 'day' in obj;
    }
      

}