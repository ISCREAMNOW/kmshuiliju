<?php


namespace app\baseinfo\controller;


use think\Controller;
use think\Db;

class Index extends Controller
{
    public $table='based_info';
   public function get_base_info(){
           //查询数据库中的基本信息并返回
           $res=Db::table($this->table)->select();
           return json($res);

   }
}