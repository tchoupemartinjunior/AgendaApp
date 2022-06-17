import { Component,Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;
  categories=['Travail', 'Personnel', 'Maison','Ecole'];
  taskObject: { itemName: any; itemPriority: any; itemCategory: string; itemDueDate: any; itemDone: boolean};

  taskName: string;
  taskPriority: string;
  taskCategory: string;
  taskDate: Date;
  taskDone: boolean;

  constructor(public modalCtrl: ModalController, public taskService: TaskService) { }

  ngOnInit() {
    console.log(this.task);
    this.taskName=  this.task.value.itemName;
    this.taskPriority=  this.task.value.itemPriority;
    this.taskCategory=  this.task.value.itemCategory;
    this.taskDate=  this.task.value.itemDueDate;
    this.taskDone=this.task.value.itemDone;
  }
  async update(){
    this.taskObject=({
      itemName:this.taskName,
      itemPriority:this.taskPriority,
      itemCategory:this.taskCategory,
      itemDueDate:this.taskDate,
      itemDone:this.taskDone
    });
   await this.taskService.updateTask(this.task.key,this.taskObject);
    this.dismiss();
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  selectedCategory(index){
    this.taskCategory =  this.categories[index];
  }

}
