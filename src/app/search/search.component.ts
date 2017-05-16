import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {positiveNumberValidator} from "../validator/validators";
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formModel:FormGroup;
  private categories: string[];
  constructor(private productService:ProductService) {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      title: ['',Validators.minLength(3)],
      price: [null,positiveNumberValidator],
      category:['-1']
    })
  }

  ngOnInit() {
    this.categories = this.productService.getCategories();
  }

  onSearch(){
    if(this.formModel.valid){
      this.productService.searchEvent.emit(this.formModel.value)
    }
  }
}
