import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import {TaskService} from '../task.service';
import { UpdateTaskPage } from '../update-task/update-task.page';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  taches=[];
 aux=[];
 listTaches=[];

today: number=Date.now();
taskDate: any;


  constructor(public modalCtrl: ModalController, public taskService: TaskService) {
    this.getAllTask();
  }

  async addTask(taskDate){
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage,
      componentProps:{taskDate1: taskDate}
    });
    modal.onDidDismiss().then(newTaskObj=>{
      if(newTaskObj.data.taskName !==''){
         this.getAllTask();
         this.getTasks();
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
  }
  async getTasks(){
    this.listTaches=[];
    this.aux= this.taches;
    console.log(this.taskDate.split('T')[0]);
    this.aux.forEach(task=>{
      console.log(task.value.itemDueDate.split('T')[0]);
  if(this.taskDate.split('T')[0]===task.value.itemDueDate.split('T')[0]){
      console.log(task.value.itemDueDate);
      this.listTaches.push(task);
    }
  });
    console.log(this.listTaches);

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
