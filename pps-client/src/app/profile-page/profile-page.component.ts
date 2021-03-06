import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { AuthService } from '../services/auth.service';
import { Reservation } from '../classes/reservation';
import { ReservationService } from '../services/reservation.service';
import { Product } from '../classes/product';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { TagService } from '../services/tag.service';
import { Tag } from '../classes/tag';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  private reservations: Reservation[];
  private products: { product: Product, pieces: number }[];
  private orderedArray: number[];
  private displayedColumns = ['id', 'name', 'quantity'];
  public selectedIndex: number = 1;
  private message = '';
  public tagList: Tag[];
  public tagListForm = new FormControl();


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private reservationService: ReservationService,
    private productService: ProductService,
    private productMsg: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private tagService: TagService
  ) { }

  private addProductForm = this.fb.group({
    name: ['', Validators.required],
    quantity: ['', Validators.required],
    description: ['', Validators.required],
    image: [''],
    tags: ['', Validators.required]
  });

  private changeProfile = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  async ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.reservations = await this.reservationService.getReservationsByUser(this.authService.user);
      this.orderedArray = this.makeArray(this.reservations);
      this.tagList = await this.tagService.getTags();
    } else {
      this.router.navigate(['login'])
    }
  }

  public makeArray(reservations: Reservation[]): number[] {
    let array: number[] = [];
    for (let reservation of reservations) {
      for (let j of reservation.products) {
        array.push(reservation.orderedQuantity[j.id])
      }
    }
    return array;
  }

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation.id);
    this.reservations = this.getReservations();
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservationProducts(reservationId: number): OrderedProducts[] {
    let op: OrderedProducts[] = [];
    for (let p of this.reservations.find(x => x.id == reservationId).products) {
      let o: OrderedProducts = new OrderedProducts;
      o.product = p;
      o.quantity = this.reservations.find(x => x.id == reservationId).orderedQuantity[p.id];
      op.push(o);
    }
    return op;
  }

  getReservationAsString(reservationId: number): string {
    let s: string = "";
    for (let p of this.reservations.find(x => x.id == reservationId).products) {
      s = s + p.name + ", ";
    }
    s = s.slice(0,s.length-2);
    if (s.length > 15) {
      s = s.substring(0, 15) + "..."
    }
    return s;
  }

  async deleteOrder(reservationId: number) {
    this.reservationService.deleteReservation(reservationId);
    this.reservations = await this.reservationService.getReservationsByUser(this.authService.user);
    this.orderedArray = this.makeArray(this.reservations);
  }

  private async onSubmit() {
    try {
      const name = this.addProductForm.get('name').value;
      const description = this.addProductForm.get('description').value;
      const quantity = parseInt(this.addProductForm.get('quantity').value);
      const image = this.addProductForm.get('image').value;
      if (quantity < 1 || Number.isNaN(quantity)) throw 'A mennyiség csak 0-nál nagyobb szám lehet!';
      if (name === '') throw 'Név nem lehet üres!';
      if (description === '') throw 'Leírás nem lehet üres!';
      let p: Product = new Product();
      p.name = name;
      p.description = description;
      p.quantity = quantity;
      p.image = image;
      let tags = this.tagListForm.value;
      let tagsToAdd: Tag[] = [];
      if (tags != null) {
      for (let t of tags) {
        tagsToAdd.push(this.tagList.find(x => x.text == t));
      }
      }
      p.tags = tagsToAdd;
      this.productService.addProduct(p);
      this.router.navigateByUrl('/products');
    } catch (e) {
      this.message = e;
    }
  }

  private async onProfileSubmit() {
    const id = this.authService.user.id;
    let name: string = this.changeProfile.get('name').value;
    let email: string = this.changeProfile.get('email').value;
    let userName: string = this.changeProfile.get('userName').value;
    if(name===""){
      name=this.authService.user.name;
    }
    if(email===""){
      email=this.authService.user.email;
    }
    if(userName===""){
      userName=this.authService.user.userName;
    }
    let user: User = new User();
    user.name = name;
    user.email = email;
    user.userName = userName;
    user.role = this.authService.user.role;
    user.password = this.authService.user.password;
    this.userService.putUser(id, user);
    this.authService.user=user;
    this.router.navigate(['profile']);
  }
}

class OrderedProducts {
  product: Product;
  quantity: number;
}