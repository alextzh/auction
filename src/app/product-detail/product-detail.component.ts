import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Comment, Product, ProductService} from "../shared/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private product:Product;
  private comments:Comment[];
  private newRating:number = 5;
  private newComment:string = '';
  private isCommentHidden:boolean = true;

  constructor(private routeInfo:ActivatedRoute,private productService:ProductService) { }

  ngOnInit() {
    let productId:number = this.routeInfo.snapshot.params["productId"];
    this.productService.getProduct(productId).subscribe(
      product => this.product = product
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );
  }

  addComment(){
    let comment:Comment = new Comment(0, this.product.id, new Date().toISOString(), 'someone', this.newRating, this.newComment);
    this.comments.unshift(comment);

    let sum = this.comments.reduce((sum,comment) => sum + comment.rating, 0);
    this.product.rating = sum/this.comments.length;
    this.newRating = 5;
    this.newComment = null;
    this.isCommentHidden = true;
  }
}
