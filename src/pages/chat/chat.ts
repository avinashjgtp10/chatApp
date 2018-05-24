import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = "";
  message: string = "";
  sub;
  messages: object[] = [];

  constructor(public navCtrl: NavController,
    public db: AngularFireDatabase,
    public navParams: NavParams) {
    console.log("NavParams" + this.navParams.get("username"));
    this.username = this.navParams.get("username");

    this.sub = this.db.list("/chat").subscribe(data => {
      console.log(data);
      this.messages=data;
    })
    this.message="";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');

  }
  sendMessage() {
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    }).then(() => {

    }).catch(() => {

    });
  }

}
