import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import {TaskService} from '../task.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  taches=[];
  tachesTriees=[];
  tachesDemain=[];
  tachesPrecedents=[];
  tachesFutur=[];

today: number=Date.now();


  constructor(public modalCtrl: ModalController, public taskService: TaskService) {
    this.getAllTask();

  }

  async addTask(){
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage
    });
    modal.onDidDismiss().then(newTaskObj=>{
      if(newTaskObj.data.taskName !==''){
         this.getAllTask();
      }
    });
    return await modal.present();
  }
  delete(key){
    this.taskService.deleteTask(key);
    this.getAllTask();
  }

  getAllTask(){
   this.taches= this.taskService.getAllTask();
   this.tachesTriees= this.taches.sort((a,b)=> a.value.itemDueDate - b.value.itemDueDate).reverse();
   console.log(this.taches);
  }

  changeTaskState(task){
    console.log(task.value.itemDone);
    this.taskService.updateTask(task.key,task.value);
  }

  async update(selectedTask){
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps:{task: selectedTask}
    });
    modal.onDidDismiss().then(()=>{
          this.getAllTask();
       });
    return await modal.present();
  }
}
