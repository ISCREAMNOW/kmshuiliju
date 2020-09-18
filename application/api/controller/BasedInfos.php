<?php


namespace app\api\controller;


use controller\ApiBase;
use think\Controller;
use think\Db;

class BasedInfos extends Controller
{
    public $table='based_info';
    public function index(){
        //查询数据库中的基本信息并返回
        $res=Db::table($this->table)->select();
        return json($res);
    }
}