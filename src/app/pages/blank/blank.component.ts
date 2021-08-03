import {AfterViewInit, Component} from '@angular/core';
import {PosteService} from "@services/poste.service";
import {Poste} from "@/Model/Poste";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})

export class BlankComponent implements AfterViewInit{

  public postes: Poste[];
  public currentPage = 0;
  public totalPages : number;
  public totalElements: number;
  public firstPage : boolean;
  public lastPage : boolean;
  public allFilter : boolean;
  public libelleFilter : boolean;
  public nbClientsFilter : boolean;
  public pasDePosFilter : boolean;
  public searchFilter : boolean;
  public searchValue : string;

  constructor(private posteService: PosteService) {
  }

  ngAfterViewInit(): void {
    this.getPostes();
  }

  public getPostes() : void{
    this.searchValue = '';
    this.posteService.getAllPostesByPage(this.currentPage).subscribe(
      (response)=>{
        this.postes=response["content"];
        this.currentPage=response["number"];
        this.totalPages=response["totalPages"];
        this.firstPage=response["first"];
        this.lastPage=response["last"];
        this.totalElements=response["totalElements"];
        this.allFilter=true;
        this.libelleFilter=false;
        this.pasDePosFilter=false;
        this.nbClientsFilter=false;
        this.searchFilter=false;
      },
      (error: HttpErrorResponse)=>{alert(error.message)}
    );
  }

  getByLibelle() :void {
    this.searchValue = '';
    this.posteService.getAllPostesByLibelle(this.currentPage).subscribe(
      (response)=>{
        this.postes=response["content"];
        this.currentPage=response["number"];
        this.totalPages=response["totalPages"];
        this.firstPage=response["first"];
        this.lastPage=response["last"];
        this.totalElements=response["totalElements"];
        this.allFilter=false;
        this.libelleFilter=true;
        this.pasDePosFilter=false;
        this.nbClientsFilter=false;
        this.searchFilter=false;
      },
      (error: HttpErrorResponse)=>{alert(error.message)}
    );
  }

  getWithoutPosition() : void {
    this.searchValue = '';
    this.posteService.getAllPostesWithoutPos(this.currentPage).subscribe(
      (response)=>{
        this.postes=response["content"];
        this.currentPage=response["number"];
        this.totalPages=response["totalPages"];
        this.firstPage=response["first"];
        this.lastPage=response["last"];
        this.totalElements=response["totalElements"];
        this.allFilter=false;
        this.libelleFilter=false;
        this.pasDePosFilter=true;
        this.nbClientsFilter=false;
        this.searchFilter=false;
      },
      (error: HttpErrorResponse)=>{alert(error.message)}
    );
  }

  getByNbClients() {
    this.searchValue = '';
    this.posteService.getAllPostesByNbClients(this.currentPage).subscribe(
      (response)=>{
        this.postes=response["content"];
        this.currentPage=response["number"];
        this.totalPages=response["totalPages"];
        this.firstPage=response["first"];
        this.lastPage=response["last"];
        this.totalElements=response["totalElements"];
        this.allFilter=false;
        this.libelleFilter=false;
        this.pasDePosFilter=false;
        this.nbClientsFilter=true;
        this.searchFilter=false;
      },
      (error: HttpErrorResponse)=>{alert(error.message)}
    );
  }

  public getBySearch(value:string) : void{
    this.posteService.getAllPostesBySearch(this.currentPage,value).subscribe(
      (response)=>{
        this.postes=response["content"];
        this.currentPage=response["number"];
        this.totalPages=response["totalPages"];
        this.firstPage=response["first"];
        this.lastPage=response["last"];
        this.totalElements=response["totalElements"];
        this.allFilter=false;
        this.libelleFilter=false;
        this.pasDePosFilter=false;
        this.nbClientsFilter=false;
        this.searchFilter=true;
      },
      (error: HttpErrorResponse)=>{alert(error.message)}
    );
  }

  getData(){
    if(this.allFilter){
      this.getPostes();
    } else if (this.libelleFilter){
      this.getByLibelle();
    }else if (this.nbClientsFilter){
      this.getByNbClients();
    }else if (this.pasDePosFilter){
      this.getWithoutPosition();
    }else if (this.searchFilter){
      this.getBySearch(this.searchValue);
    }
  }

  getAll() {
    this.currentPage=0;
    this.getPostes();
  }


  //-------------Pagination methods
  getDeb() {
    this.currentPage=0;
    this.getData();

  }

  getPrec() {
    this.currentPage=this.currentPage-1;
    this.getData();
  }

  getSuiv() {
    this.currentPage=this.currentPage+1;
    this.getData();
  }

  getFin() {
    this.currentPage=this.totalPages-1;
    this.getData();
  }


}
