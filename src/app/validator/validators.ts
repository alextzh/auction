import {FormControl} from "@angular/forms";
/**
 * Created by tianzhihong on 2017/4/20.
 */
export function positiveNumberValidator(control:FormControl):any{
  if(!control.value){
    return null;
  }
  let price = parseInt(control.value);
  if(price>0){
    return null;
  }else{
    return {positiveNumber:true}
  }
}
