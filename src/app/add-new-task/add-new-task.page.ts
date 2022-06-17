import { TaskService } from './../task.service';
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/semi */
import { Component,Input,OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  @Input() taskDate1;
  categories=['Travail', 'Personnel', 'Maison','Ecole'];

  taskName: any
  taskPriority: any
  taskCategory: string
  taskDate: Date
  taskDone: boolean

  taskObject: { itemName: any; itemPriority: any; itemCategory: string; itemDueDate: Date; itemDone: boolean}
  constructor(public modalCtrl: ModalController, public taskService: TaskService) { }

  ngOnInit() {
    this.taskDate=  this.taskDate1;
  }

  async dismiss() {
    await this.modalCtrl.dismiss(this.taskObject)
  }
   selectedCategory(index){
    this.taskCategory =  this.categories[index]
  }
  async addTask(){
    this.taskObject=({
      itemName:this.taskName,
      itemPriority:this.taskPriority,
      itemCategory:this.taskCategory,
      itemDueDate:this.taskDate,
      itemDone:false
    });
    const uid = this.taskName + this.taskDate;
    if(uid){
      this.taskService.addTask(uid, this.taskObject);
    }else{
      console.log('Tâche vide');
    }


    this.dismiss()
  }
}
