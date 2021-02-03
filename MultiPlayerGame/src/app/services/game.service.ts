import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private firestore: AngularFirestore) {

  }

  check() {
    return this.firestore.collection('game').snapshotChanges();
  }

  push(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("game")
        .add(data)
        .then(res => { resolve(true) }, err => reject(err));
    });
  }
  update(data: any,docId:any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("game").doc(docId).update(data)
        .then(res => { resolve(true) }, err => reject(err));
    });
  }
  refresh(data: any) {
    return new Promise<any>((resolve, reject) => {
      data.map((x: any) => {
        this.firestore
          .collection("game").doc(x.payload.doc.id).delete()
          .then(res => { console.log(res) }, err => reject(err));
      });
      resolve(true)
    });
  }
}
