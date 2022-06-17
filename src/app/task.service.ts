import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private storage: Storage) {
    this.init();
  }

    addTask(key,value){
      this.storage.set(key,value);
    }
   async deleteTask(key){
     await this.storage.remove(key);
    }
    async updateTask(key, value){
      await this.storage.remove(key);
      await this.storage.set(key,value);

    }
    getAllTask(){
      const tasks: any=[];
      this.storage.forEach((key, value, index)=>{
      tasks.push({key:value, value:key});
      });
      return tasks;
    }

    async init(){
      await this.storage.create();
    }
}
