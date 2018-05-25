import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
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
  @ViewChild('content') content:any;

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
   
    console.log("Message:"+this.message);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.content.scrollToBottom(300);
  }
  sendMessage() {
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    }).then(() => {
      this.message="";
      this.content.scrollToBottom(300);
    }).catch(() => {

    });
  }

}
