<?php


namespace app\terminal\model;


use think\Model;

class Base extends Model
{
   //数据库时间字段的自动转化
    public function getAddTimeAttr($value){
        $time=date('y-m-d H:m:s',$value);
        return $time;
    }
}