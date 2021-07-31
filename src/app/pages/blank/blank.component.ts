import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PosteService} from "@services/poste.service";
import {Poste} from "@/Model/Poste";
import {HttpErrorResponse} from "@angular/common/http";

declare const $;

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit, AfterViewInit{

  public postes: Poste[];

  constructor(private posteService: PosteService) {
  }

  public getPostes() : void{
    this.posteService.getAllPostes().subscribe(
      (response: Poste[])=>{
        this.postes=response;
      },
      (error: HttpErrorResponse)=>{alert(error.message)}
    );
  }

  ngOnInit(): void {
    this.getPostes();
  }

  ngAfterViewInit(): void {
    $('#postes-Table').DataTable();
  }


}
