<?php


namespace app\baseinfo\controller;

use think\Controller;
use think\Db;

class Index extends Controller
{
    //定义数据库表
    public $table='based_info';

    //查询数据库将数据库中关于项目简介和示意图返回到前端
   public function get_base_info(){
           //查询数据库中的基本信息并返回
           $res=Db::table($this->table)->select();
           return json($res);

   }
}