import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { AngularFire,FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  books: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public angFire: AngularFire) {
      this.books = angFire.database.list('/Books');
  }

  addBook():void{
    let prompt = this.alertCtrl.create({
       title: 'Book Title and Author',
       message: 'Enter the books title and author',
       inputs: [
         {
           name: 'title',
           placeholder: "Book Title"
         },
         {
           name: 'author',
           placeholder: "Author's Name"
         }
       ],
      buttons:[
        {
          text: "Cancel",
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: "Save Book",
          handler: data => {
            this.books.push({
              title: data.title,
              author: data.author
            });
          }
        }
      ]
    });

    prompt.present();
  }
  editBook(book):void{
    let prompt = this.alertCtrl.create({
       title: 'Edit Book',
       message: 'Edit the book title and author',
       inputs: [
         {
           name: 'title',
           placeholder: book.title
         },
         {
           name: 'author',
           placeholder: book.author
         }
       ],
      buttons:[
        {
          text: "Cancel",
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: "Update Book",
          handler: data => {
            let newTitle:string = book.title;
            let newAuthor:string = book.author;

            if(data.title != ''){
              newTitle = data.title;
            }
            if(data.author != ''){
              newAuthor = data.author;
            }
            this.books.update(book.$key,{
              title: newTitle,
              author: newAuthor
            });
          }
        }
      ]
    });

    prompt.present();
  }
  deleteBook(bookId):void{
    let prompt = this.alertCtrl.create({
       title: 'Delete Book',

      buttons:[
        {
          text: "Cancel",
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: "Delete Book",
          handler: data => {
            this.books.remove(bookId);
          }
        }
      ]
    });

    prompt.present();
  }

}
